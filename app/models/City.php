<?php

class City extends \Eloquent {
	protected $fillable = [];

    protected $table = 'cities';

    protected $hidden = array('state_id', 'created_at', 'updated_at');

    public static $rules = array(
        'name' => 'required'
    );

    /**
     * Defines a one-to-one relationship.
     *
     * @see http://laravel.com/docs/eloquent#one-to-one
     */
    public function state()
    {
        return $this->belongsTo('State');
    }

}