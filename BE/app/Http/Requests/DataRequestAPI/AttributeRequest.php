<?php

namespace App\Http\Requests\DataRequestAPI;

use Illuminate\Foundation\Http\FormRequest;

class AttributeRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100'],
        ];
    }
    /**
     * Custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Tên thuộc tính là bắt buộc.',
            'name.string' => 'Tên thuộc tính phải là một chuỗi ký tự.',
            'name.max' => 'Tên thuộc tính không được vượt quá 100 ký tự.',
        ];
    }
}
