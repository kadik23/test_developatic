<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * List users with pagination, search, and sorting
     * 
     * @group User Management
     * @authenticated
     * 
     * @queryParam per_page integer Number of users per page. Example: 15
     * @queryParam search string Search users by name. Example: john
     * @queryParam sort_by string Sort by field (name, email, date_of_birth, created_at). Example: created_at
     * @queryParam sort_order string Sort order (asc, desc). Example: desc
     * 
     * @response 200 {
     *   "success": true,
     *   "data": [
     *     {
     *       "id": 1,
     *       "name": "John Doe",
     *       "email": "john@example.com",
     *       "date_of_birth": "1990-01-01",
     *       "user_type": "STANDARD",
     *       "created_at": "2024-01-01T00:00:00.000000Z",
     *       "updated_at": "2024-01-01T00:00:00.000000Z"
     *     }
     *   ],
     *   "pagination": {
     *     "total": 1000,
     *     "per_page": 15,
     *     "current_page": 1,
     *     "last_page": 67
     *   },
     *   "filters": {
     *     "search": "john",
     *     "sort_by": "name",
     *     "sort_order": "asc",
     *     "per_page": 15
     *   }
     * }
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 15);
            $search = $request->get('search');
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');

            $users = $this->userRepository->getUsersWithPagination($perPage, $search, $sortBy, $sortOrder);

            return response()->json([
                'success' => true,
                'data' => $users->items(),
                'pagination' => [
                    'total' => $users->total(),
                    'per_page' => $users->perPage(),
                    'current_page' => $users->currentPage(),
                    'last_page' => $users->lastPage(),
                ],
                'filters' => [
                    'search' => $search,
                    'sort_by' => $sortBy,
                    'sort_order' => $sortOrder,
                    'per_page' => $perPage,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching users.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Get age distribution of users
     * 
     * @group User Statistics
     * @authenticated
     * 
     * @response 200 {
     *   "success": true,
     *   "data": [
     *     {
     *       "age_range": "Under 18",
     *       "count": 50
     *     },
     *     {
     *       "age_range": "18-25",
     *       "count": 200
     *     },
     *     {
     *       "age_range": "26-35",
     *       "count": 300
     *     },
     *     {
     *       "age_range": "36-50",
     *       "count": 250
     *     },
     *     {
     *       "age_range": "Over 50",
     *       "count": 200
     *     }
     *   ]
     * }
     * 
     * @return JsonResponse
     */
    public function ageDistribution(): JsonResponse
    {
        try {
            $ageDistribution = $this->userRepository->getUsersByAgeRange();

            return response()->json([
                'success' => true,
                'data' => $ageDistribution
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching age distribution.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Find user pairs whose ages sum up to a given number
     * 
     * @group User Statistics
     * @authenticated
     * 
     * @queryParam age_sum integer required The target sum of ages (1-150). Example: 50
     * 
     * @response 200 {
     *   "success": true,
     *   "data": [
     *     {
     *       "user1": {
     *         "id": 1,
     *         "name": "John Doe",
     *         "email": "john@example.com",
     *         "date_of_birth": "1990-01-01",
     *         "age": 34
     *       },
     *       "user2": {
     *         "id": 2,
     *         "name": "Jane Smith",
     *         "email": "jane@example.com",
     *         "date_of_birth": "1996-01-01",
     *         "age": 16
     *       },
     *       "age_sum": 50
     *     }
     *   ],
     *   "target_sum": 50,
     *   "count": 1
     * }
     * 
     * @response 422 {
     *   "success": false,
     *   "message": "The given data was invalid.",
     *   "errors": {
     *     "age_sum": [
     *       "The age sum field is required."
     *     ]
     *   }
     * }
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function userPairs(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'age_sum' => 'required|integer|min:1|max:150'
            ]);

            $targetSum = $request->get('age_sum');
            $pairs = $this->userRepository->findUserPairsByAgeSum($targetSum);

            return response()->json([
                'success' => true,
                'data' => $pairs,
                'target_sum' => $targetSum,
                'count' => count($pairs)
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while finding user pairs.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
} 