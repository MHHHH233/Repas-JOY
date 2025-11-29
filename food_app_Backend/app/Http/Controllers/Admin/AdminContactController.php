<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminContactController extends Controller
{
    /**
     * Display a listing of all contacts (Admin only)
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        $status = $request->query('status');
        
        $query = Contact::query();
        
        // Filter by status if provided
        if ($status) {
            $query->where('status', $status);
        }
        
        // Order by latest first
        $contacts = $query->orderBy('created_at', 'desc')->paginate($perPage);
        
        return response()->json([
            'success' => true,
            'data' => $contacts
        ]);
    }

    /**
     * Store a newly created contact (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'status' => 'sometimes|string|max:50|in:pending,read,replied'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $contact = Contact::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Contact created successfully',
            'data' => $contact
        ], 201);
    }

    /**
     * Display the specified contact (Admin only)
     */
    public function show(string $id)
    {
        $contact = Contact::find($id);
        
        if (!$contact) {
            return response()->json([
                'success' => false,
                'message' => 'Contact not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $contact
        ]);
    }

    /**
     * Update the specified contact (Admin only)
     */
    public function update(Request $request, string $id)
    {
        $contact = Contact::find($id);
        
        if (!$contact) {
            return response()->json([
                'success' => false,
                'message' => 'Contact not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:100',
            'email' => 'sometimes|string|email|max:255',
            'subject' => 'sometimes|string|max:255',
            'message' => 'sometimes|string',
            'status' => 'sometimes|string|max:50|in:pending,read,replied'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $contact->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Contact updated successfully',
            'data' => $contact
        ]);
    }

    /**
     * Remove the specified contact (Admin only)
     */
    public function destroy(string $id)
    {
        $contact = Contact::find($id);
        
        if (!$contact) {
            return response()->json([
                'success' => false,
                'message' => 'Contact not found'
            ], 404);
        }

        $contact->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contact deleted successfully'
        ]);
    }

    /**
     * Update contact status (Admin only)
     */
    public function updateStatus(Request $request, string $id)
    {
        $contact = Contact::find($id);
        
        if (!$contact) {
            return response()->json([
                'success' => false,
                'message' => 'Contact not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|string|max:50|in:pending,read,replied'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $contact->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Contact status updated successfully',
            'data' => $contact
        ]);
    }

    /**
     * Get contact statistics (Admin only)
     */
    public function getStats()
    {
        $totalContacts = Contact::count();
        $pendingContacts = Contact::where('status', 'pending')->count();
        $readContacts = Contact::where('status', 'read')->count();
        $repliedContacts = Contact::where('status', 'replied')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_contacts' => $totalContacts,
                'pending_contacts' => $pendingContacts,
                'read_contacts' => $readContacts,
                'replied_contacts' => $repliedContacts
            ]
        ]);
    }
}

