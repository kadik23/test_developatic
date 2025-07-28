<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository
{
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function getStandardUsersCount(): int
    {
        return $this->model->where('user_type', 'STANDARD')->count();
    }

    public function getDashboardStatistics(): array
    {
        $totalUsers = $this->model->count();
        $standardUsers = $this->model->where('user_type', 'STANDARD')->count();        
        $ageDistribution = $this->getUsersByAgeRange();
        
        // Calculate average age using PHP instead of MySQL-specific functions
        $usersWithBirthDate = $this->model->whereNotNull('date_of_birth')->get();
        $totalAge = 0;
        $countWithAge = 0;
        
        foreach ($usersWithBirthDate as $user) {
            $age = $user->date_of_birth->diffInYears(now());
            $totalAge += $age;
            $countWithAge++;
        }
        
        $averageAge = $countWithAge > 0 ? $totalAge / $countWithAge : 0;
        
        // (last 30 days)
        $recentUsers = $this->model->where('created_at', '>=', now()->subDays(30))->count();
        
        return [
            'total_users' => $totalUsers,
            'standard_users' => $standardUsers,
            'average_age' => round($averageAge, 1),
            'recent_users' => $recentUsers,
            'age_distribution' => $ageDistribution,
        ];
    }

    public function getUsersWithPagination(
        int $perPage = 15,
        string $search = null,
        string $sortBy = 'created_at',
        string $sortOrder = 'desc'
    ): LengthAwarePaginator {
        $query = $this->model->query();

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        return $query->orderBy($sortBy, $sortOrder)->paginate($perPage);
    }

    public function findById(int $id): ?User
    {
        return $this->model->find($id);
    }

    public function deleteUser(int $id): bool
    {
        $user = $this->findById($id);
        if ($user && $user->user_type !== 'ADMIN') {
            return $user->delete();
        }
        return false;
    }

    public function updateUser(int $id, array $data): bool
    {
        $user = $this->findById($id);
        if ($user) {
            return $user->update($data);
        }
        return false;
    }

    public function updatePassword(int $id, string $password): bool
    {
        $user = $this->findById($id);
        if ($user) {
            return $user->update(['password' => bcrypt($password)]);
        }
        return false;
    }

    public function getAdminUser(): ?User
    {
        return $this->model->where('user_type', 'ADMIN')->first();
    }

    public function getAllUsers(): Collection
    {
        return $this->model->all();
    }

    public function getUsersByAgeRange(): array
    {
        $users = $this->model->whereNotNull('date_of_birth')->get();
        $ageRanges = [
            'Under 18' => 0,
            '18-25' => 0,
            '26-35' => 0,
            '36-50' => 0,
            'Over 50' => 0
        ];

        foreach ($users as $user) {
            $age = $user->date_of_birth ? $user->date_of_birth->diffInYears(now()) : 0;
            
            if ($age < 18) {
                $ageRanges['Under 18']++;
            } elseif ($age >= 18 && $age <= 25) {
                $ageRanges['18-25']++;
            } elseif ($age >= 26 && $age <= 35) {
                $ageRanges['26-35']++;
            } elseif ($age >= 36 && $age <= 50) {
                $ageRanges['36-50']++;
            } else {
                $ageRanges['Over 50']++;
            }
        }

        $result = [];
        foreach ($ageRanges as $range => $count) {
            $result[] = [
                'age_range' => $range,
                'count' => $count
            ];
        }

        return $result;
    }

    public function findUserPairsByAgeSum(int $targetSum): array
    {
        $users = $this->model->whereNotNull('date_of_birth')->get();
        $pairs = [];

        foreach ($users as $i => $user1) {
            $age1 = $user1->date_of_birth ? date_diff(date_create($user1->date_of_birth), date_create())->y : 0;
            
            for ($j = $i + 1; $j < count($users); $j++) {
                $user2 = $users[$j];
                $age2 = $user2->date_of_birth ? date_diff(date_create($user2->date_of_birth), date_create())->y : 0;
                
                if ($age1 + $age2 === $targetSum) {
                    $pairs[] = [
                        'user1' => $user1,
                        'user2' => $user2,
                        'age_sum' => $targetSum
                    ];
                }
            }
        }

        return $pairs;
    }
} 