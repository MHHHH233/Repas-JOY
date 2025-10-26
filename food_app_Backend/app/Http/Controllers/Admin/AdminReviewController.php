<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminReviewController extends Controller
{
    /**
     * Display a listing of all reviews (Admin only)
     */
    public function index()
    {
        $reviews = Review::all();
        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }

    /**
     * Store a newly created review (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom_user' => 'required|string|max:255',
            'des' => 'required|string',
            'stars' => 'required|integer|min:1|max:5'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $review = Review::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Review created successfully',
            'data' => $review
        ], 201);
    }

    /**
     * Display the specified review (Admin only)
     */
    public function show(string $id)
    {
        $review = Review::find($id);
        
        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $review
        ]);
    }

    /**
     * Update the specified review (Admin only)
     */
    public function update(Request $request, string $id)
    {
        $review = Review::find($id);
        
        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom_user' => 'sometimes|string|max:255',
            'des' => 'sometimes|string',
            'stars' => 'sometimes|integer|min:1|max:5'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $review->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully',
            'data' => $review
        ]);
    }

    /**
     * Remove the specified review (Admin only)
     */
    public function destroy(string $id)
    {
        $review = Review::find($id);
        
        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ]);
    }

    /**
     * Get review statistics (Admin only)
     */
    public function getStats()
    {
        $totalReviews = Review::count();
        $averageRating = Review::avg('stars');
        $fiveStarReviews = Review::where('stars', 5)->count();
        $oneStarReviews = Review::where('stars', 1)->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_reviews' => $totalReviews,
                'average_rating' => round($averageRating, 2),
                'five_star_reviews' => $fiveStarReviews,
                'one_star_reviews' => $oneStarReviews
            ]
        ]);
    }
}
