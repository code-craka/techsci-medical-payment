import { LRUCache } from 'lru-cache';
import { NextResponse } from 'next/server';

interface RateLimitOptions {
  uniqueTokenPerInterval?: number;
  interval?: number;
  limit?: number;
}

export default function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (token: string) => {
      const tokenCount = (tokenCache.get(token) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(token, [1]);
      } else {
        tokenCount[0] += 1;
        tokenCache.set(token, tokenCount);
      }

      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage >= (options?.limit || 10);

      return {
        isRateLimited,
        currentUsage,
        limit: options?.limit || 10,
      };
    },
  };
}

// Create instances for different endpoints
export const authRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  limit: 5, // 5 requests per minute
});

export const resetPasswordRateLimit = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  limit: 3, // 3 requests per hour
});

export function withRateLimit(
  handler: Function,
  limiter: ReturnType<typeof rateLimit>,
  identifier: (req: Request) => string
) {
  return async function rateMiddleware(req: Request) {
    try {
      const id = identifier(req);
      const { isRateLimited, limit, currentUsage } = limiter.check(id);

      if (isRateLimited) {
        return NextResponse.json(
          {
            error: 'Too many requests',
            message: 'Please try again later',
          },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': Math.max(0, limit - currentUsage).toString(),
              'Retry-After': '60',
            },
          }
        );
      }

      return handler(req);
    } catch (error) {
      console.error('Rate limit error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
