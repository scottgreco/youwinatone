<?php

class State extends \Eloquent {
	protected $fillable = [];

    protected $table = 'states';

    protected $hidden = array('created_at', 'updated_at');

    public static $rules = array(
        'name' => 'required|unique:states'
    );

    public function cities()
    {
        return $this->hasMany('City');
    }
}