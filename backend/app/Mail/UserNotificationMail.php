<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    public function __construct($details)
    {
        $this->details = $details;
    }

    public function build()
    {
        return $this->from(config('mail.from.address'))
                    ->subject('Notification')
                    ->view('emails.codegame')
                    ->with([
                        'name' => $this->details['name'],
                        'messageContent' => $this->details['message'],
                    ]);
    }
}
