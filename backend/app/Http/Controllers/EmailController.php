<?php

namespace App\Http\Controllers;

use App\Mail\UserNotificationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
            'message' => 'required|string',
        ]);

        $details = [
            'name' => $validated['name'],
            'message' => $validated['message'],
        ];

        Mail::to($validated['email'])->send(new UserNotificationMail($details));

        return response()->json(['message' => 'Email sent successfully.']);
    }
}
