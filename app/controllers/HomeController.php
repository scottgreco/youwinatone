<?php

class HomeController extends BaseController {

	public function offices()
	{
        $offices = Office::with('manager')->get();

        $states = State::orderBy('name', 'ASC')->with('cities')->get();

        $array = array();
        foreach ($states as $state) {
            $array = array_add($array, $state->name, $state->cities->sortBy('name')->lists('id','name'));
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
                $message->from('ywao@realtyonegroup.com', 'You Win At One Website');
                $message->to('leads@realtyonegroup.com', 'Leads @ You Win At One')->subject('New feedback from You Win At One Website');
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
            if(strlen($mailTo) == 0){
                $mailTo = 'leads@realtyonegroup.com';
            }

            $result = Mail::send('emails.conversation', $data, function($message) use ($mailTo)
            {
                $message->from('ywao@realtyonegroup.com', 'You Win At One Website');
                $message->to($mailTo, $mailTo)->subject('New conversation from You Win At One Website');
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
                $message->from('ywao@realtyonegroup.com', 'You Win At One Website');
                $message->to('marketing@realtyonegroup.com', 'Marketing @ You Win At One')->subject('New notification request from You Win At One Website');
            });
            return Response::json($result);
        }
        catch(Exception $exception)
        {
            return Response::make('error! ' . $exception->getCode());
        }
    }
}
