<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        $statistics = $this->userRepository->getDashboardStatistics();

        return Inertia::render('Dashboard', [
            'statistics' => $statistics,
        ]);
    }
} 