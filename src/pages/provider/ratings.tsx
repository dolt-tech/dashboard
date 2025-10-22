import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockBookings } from '../../lib/mockData';
import { Star, MessageSquare, ThumbsUp, TrendingUp } from 'lucide-react';

const RatingsAndReviews = () => {
  const completedBookings = mockBookings.filter((b) => b.status === 'completed' && b.rating);
  const totalRating = completedBookings.reduce((sum, b) => sum + (b.rating || 0), 0) / completedBookings.length || 0;

  const ratingBreakdown = {
    5: completedBookings.filter((b) => b.rating === 5).length,
    4: completedBookings.filter((b) => b.rating === 4).length,
    3: completedBookings.filter((b) => b.rating === 3).length,
    2: completedBookings.filter((b) => b.rating === 2).length,
    1: completedBookings.filter((b) => b.rating === 1).length,
  };

  const totalReviews = completedBookings.length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'fill-[#FF7A00] text-[#FF7A00]'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Ratings & Reviews</h1>
        <p className="text-muted-foreground mt-1">See what your customers think about your service</p>
      </div>

      {/* Overall Rating */}
      <Card>
        <CardHeader>
          <CardTitle>Your Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#FF7A00]">
                {totalRating.toFixed(1)}
              </div>
              <div className="flex justify-center gap-1 mt-2">
                {renderStars(Math.round(totalRating))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Based on {totalReviews} reviews
              </p>
            </div>

            <div className="flex-1 space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8 text-right">{stars}★</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF7A00] transition-all"
                      style={{
                        width: `${totalReviews > 0 ? (ratingBreakdown[stars as keyof typeof ratingBreakdown] / totalReviews) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-left">
                    {ratingBreakdown[stars as keyof typeof ratingBreakdown]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{totalReviews}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Positive Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {totalReviews > 0 ? `${(((ratingBreakdown[5] + ratingBreakdown[4]) / totalReviews) * 100).toFixed(0)}%` : 'N/A'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>Recent feedback from your customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {completedBookings.length > 0 ? (
            completedBookings.map((booking) => (
              <div key={booking.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <img
                      src="https://avatar.vercel.sh/customer"
                      alt={booking.customerName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{booking.customerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.completedAt?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {booking.rating && (
                    <div className="flex gap-1">
                      {renderStars(booking.rating)}
                    </div>
                  )}
                </div>

                {booking.review && (
                  <p className="text-sm text-foreground mt-3">{booking.review}</p>
                )}

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Helpful
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Star className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No reviews yet</p>
              <p className="text-sm text-muted-foreground mt-1">Complete jobs to receive reviews</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Average Response Time</p>
            <p className="text-2xl font-bold text-foreground">2 hours</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Completion Rate</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#FF7A00]" style={{ width: '98%' }} />
              </div>
              <p className="font-semibold text-foreground">98%</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">On-Time Rate</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#FF7A00]" style={{ width: '96%' }} />
              </div>
              <p className="font-semibold text-foreground">96%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RatingsAndReviews;