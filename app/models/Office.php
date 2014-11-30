<?php

class Office extends Eloquent {

    /**
    * The database table used by the model.
    *
    * @var string
    */
    protected $table = 'offices';

    protected $hidden = array('manager_id', 'created_at', 'updated_at');

    public static $rules = array(
        'name' => 'required',
        'address' => 'required',
        'lat' => 'required',
        'lng' => 'required',
        'city_id' => 'required',
        'manager_id' => 'required',
    );

    /**
     * Defines a one-to-one relationship.
     *
     * @see http://laravel.com/docs/eloquent#one-to-one
     */
    public function manager()
    {
       return $this->belongsTo('Manager');
    }

    public function city()
    {
        return $this->belongsTo('City');
    }

}