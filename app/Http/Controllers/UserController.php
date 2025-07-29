<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);
        $search = $request->get('search');
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $users = $this->userRepository->getUsersWithPagination($perPage, $search, $sortBy, $sortOrder);

        return Inertia::render('Users/Index', [
            'users' => [
                "data" => $users->items(),
                "total" => $users->total(),
                "current_page" => $users->currentPage(),
                "per_page" => $users->perPage(),
                "last_page" => $users->lastPage(),
            ],
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
                'per_page' => $perPage,
            ]
        ]);
    }

    public function destroy(Request $request, int $id)
    {
        $deleted = $this->userRepository->deleteUser($id);



        if ($deleted) {
            return redirect()->back()->with('success', 'User deleted successfully!');
        }
        return redirect()->back()->with('error', 'User not found or cannot be deleted');
    }
} 