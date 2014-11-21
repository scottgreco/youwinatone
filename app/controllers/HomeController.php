<?php

class HomeController extends BaseController {

	public function offices()
	{
        $offices = Office::with('manager')->get();

        $states = State::with('cities')->get();

        $array = array();
        foreach ($states as $state) {

            $array = array_add($array, $state->name, $state->cities->lists('name'));
        }

        $response = [
            'offices'   => $offices,
            'states' => $array
        ];

        return Response::json($response);

	}

    public function feedback(){

        try {

            // the data that will be passed into the mail view blade template
            $data = array(
                'name'	=> Input::get('name'),
                'email'	=> Input::get('email'),
                'phone'	=> Input::get('phone'),
                'msg'	=> Input::get('message'),
            );

            $result = Mail::send('emails.feedback', $data, function($message)
            {
                $message->from('notificaciones@cloversistemas.com.ar', 'You Win At One Website');
                $message->to('jramos@cloversistemas.com.ar', 'You Win At One')->subject('New feedback from You Win At One Website');
            });

            return Response::json($result);

        }
        catch(Exception $exception)
        {
            return Response::make('error! ' . $exception->getCode());
        }


    }

    public function conversation(){
        try
        {
            $data = array(
                'name'	=> Input::get('name'),
                'email'	=> Input::get('email'),
                'phone'	=> Input::get('phone'),
                'msg'	=> Input::get('message'),
            );

            $mailTo = Input::get('emailTo');

            $result = Mail::send('emails.conversation', $data, function($message)
            {
                $message->from('notificaciones@cloversistemas.com.ar', 'You Win At One Website');
                $message->to('jramos@cloversistemas.com.ar', 'You Win At One')->subject('New conversation from You Win At One Website');
            });
            return Response::json($result);

        }
        catch(Exception $exception)
        {
            return Response::make('error! ' . $exception->getCode());
        }
    }

    public function notify(){
        try{
            $data = array(
                'name'	=> Input::get('name'),
                'email'	=> Input::get('email'),
                'phone'	=> Input::get('phone'),
                'location'	=> Input::get('location'),
            );

            $result = Mail::send('emails.notify', $data, function($message)
            {
                $message->from('notificaciones@cloversistemas.com.ar', 'You Win At One Website');
                $message->to('jramos@cloversistemas.com.ar', 'You Win At One')->subject('New notification request from You Win At One Website');
            });
            return Response::json($result);
        }
        catch(Exception $exception)
        {
            return Response::make('error! ' . $exception->getCode());
        }
    }
}
