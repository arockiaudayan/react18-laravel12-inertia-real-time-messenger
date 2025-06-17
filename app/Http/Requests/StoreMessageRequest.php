<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'receiver_id' => 'required_without:group_id|nullable|exists:users,id',
            'message' => 'required|string|max:1000',
            'group_id' => 'required_without:receiver_id|nullable|exists:groups,id',
            'attachments' => 'nullable|array|max:10',
            'attachments.*' => 'file|mimes:jpg,jpeg,png,gif,webp,mp4,mov,avi,wmv,flv,mp3,wav|max:5120', // 5MB max
            // 'attachments.*.name' => 'required|string|max:255',
            // 'attachments.*.path' => 'required|string|max:255',
            // 'attachments.*.type' => 'required|string|max:50',
            // 'attachments.*.size' => 'required|integer|min:1|max:5120', // 5MB max   
        ];
    }
}
