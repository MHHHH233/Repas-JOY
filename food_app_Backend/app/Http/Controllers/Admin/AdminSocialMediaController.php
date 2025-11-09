<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminSocialMediaController extends Controller
{
    /**
     * Display a listing of all social media (Admin only)
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        $socialMedia = SocialMedia::paginate($perPage);
        return response()->json([
            'success' => true,
            'data' => $socialMedia
        ]);
    }

    /**
     * Store a newly created social media (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'logo' => 'nullable|string|max:255',
            'instagram' => 'nullable|url|max:255',
            'facebook' => 'nullable|url|max:255',
            'x' => 'nullable|url|max:255',
            'urls_for_local' => 'nullable|array',
            'urls_for_local.*' => 'url',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'tiktok' => 'nullable|url|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $socialMedia = SocialMedia::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Social media created successfully',
            'data' => $socialMedia
        ], 201);
    }

    /**
     * Display the specified social media (Admin only)
     */
    public function show(string $id)
    {
        $socialMedia = SocialMedia::find($id);
        
        if (!$socialMedia) {
            return response()->json([
                'success' => false,
                'message' => 'Social media not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $socialMedia
        ]);
    }

    /**
     * Update the specified social media (Admin only)
     */
    public function update(Request $request, string $id)
    {
        $socialMedia = SocialMedia::find($id);
        
        if (!$socialMedia) {
            return response()->json([
                'success' => false,
                'message' => 'Social media not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'logo' => 'sometimes|string|max:255',
            'instagram' => 'sometimes|url|max:255',
            'facebook' => 'sometimes|url|max:255',
            'x' => 'sometimes|url|max:255',
            'urls_for_local' => 'sometimes|array',
            'urls_for_local.*' => 'url',
            'email' => 'sometimes|email|max:255',
            'phone' => 'sometimes|string|max:255',
            'tiktok' => 'sometimes|url|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $socialMedia->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Social media updated successfully',
            'data' => $socialMedia
        ]);
    }

    /**
     * Remove the specified social media (Admin only)
     */
    public function destroy(string $id)
    {
        $socialMedia = SocialMedia::find($id);
        
        if (!$socialMedia) {
            return response()->json([
                'success' => false,
                'message' => 'Social media not found'
            ], 404);
        }

        $socialMedia->delete();

        return response()->json([
            'success' => true,
            'message' => 'Social media deleted successfully'
        ]);
    }

    /**
     * Get social media statistics (Admin only)
     */
    public function getStats()
    {
        $totalSocialMedia = SocialMedia::count();
        $withInstagram = SocialMedia::whereNotNull('instagram')->count();
        $withFacebook = SocialMedia::whereNotNull('facebook')->count();
        $withEmail = SocialMedia::whereNotNull('email')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_social_media' => $totalSocialMedia,
                'with_instagram' => $withInstagram,
                'with_facebook' => $withFacebook,
                'with_email' => $withEmail
            ]
        ]);
    }
}
