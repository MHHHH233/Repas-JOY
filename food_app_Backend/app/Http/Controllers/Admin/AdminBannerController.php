<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminBannerController extends Controller
{
    /**
     * Display a listing of all banners (Admin only)
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        $type = $request->query('type');
        $status = $request->query('status');
        
        $query = Banner::query();
        
        // Filter by type if provided
        if ($type) {
            $query->where('type', $type);
        }
        
        // Filter by status if provided
        if ($status) {
            $query->where('status', $status);
        }
        
        // Order by rank, then by created_at
        $banners = $query->orderBy('rank', 'asc')->orderBy('created_at', 'desc')->paginate($perPage);
        
        return response()->json([
            'success' => true,
            'data' => $banners
        ]);
    }

    /**
     * Store a newly created banner (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|max:100',
            'status' => 'sometimes|string|max:50|in:active,inactive',
            'button' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:500',
            'rank' => 'sometimes|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $banner = Banner::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Banner created successfully',
            'data' => $banner
        ], 201);
    }

    /**
     * Display the specified banner (Admin only)
     */
    public function show(string $id)
    {
        $banner = Banner::find($id);
        
        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $banner
        ]);
    }

    /**
     * Update the specified banner (Admin only)
     */
    public function update(Request $request, string $id)
    {
        $banner = Banner::find($id);
        
        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'type' => 'sometimes|string|max:100',
            'status' => 'sometimes|string|max:50|in:active,inactive',
            'button' => 'sometimes|nullable|string|max:255',
            'image' => 'sometimes|nullable|string|max:500',
            'rank' => 'sometimes|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $banner->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Banner updated successfully',
            'data' => $banner
        ]);
    }

    /**
     * Remove the specified banner (Admin only)
     */
    public function destroy(string $id)
    {
        $banner = Banner::find($id);
        
        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found'
            ], 404);
        }

        $banner->delete();

        return response()->json([
            'success' => true,
            'message' => 'Banner deleted successfully'
        ]);
    }

    /**
     * Update banner status (Admin only)
     */
    public function updateStatus(Request $request, string $id)
    {
        $banner = Banner::find($id);
        
        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|string|max:50|in:active,inactive'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $banner->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Banner status updated successfully',
            'data' => $banner
        ]);
    }

    /**
     * Get banner statistics (Admin only)
     */
    public function getStats()
    {
        $totalBanners = Banner::count();
        $activeBanners = Banner::where('status', 'active')->count();
        $inactiveBanners = Banner::where('status', 'inactive')->count();
        
        // Count by type
        $bannersByType = Banner::selectRaw('type, count(*) as count')
            ->groupBy('type')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_banners' => $totalBanners,
                'active_banners' => $activeBanners,
                'inactive_banners' => $inactiveBanners,
                'by_type' => $bannersByType
            ]
        ]);
    }
}





