<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Request;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Request>
 */
class RequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'created_on' => $this->faker->date(),
            'location' => $this->faker->address(),
            'service' => $this->faker->word(),
            'status' => $this->faker->randomElement(['NEW', 'IN_PROGRESS', 'ON_HOLD', 'REJECTED', 'CANCELLED']),
            'priority' => $this->faker->randomElement(['HIGH', 'MEDIUM', 'LOW']),
            'department' => $this->faker->word(),
            'requested_by' => $this->faker->name(),
            'assigned_to' => $this->faker->name(),
        ];
    }
}
