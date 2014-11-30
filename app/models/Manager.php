<?php

class Manager extends EloquentBaseModel {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'managers';

    protected $forcedNullFields = ['email'];

    protected $hidden = array('created_at', 'updated_at');

    public function office()
    {
        return $this->hasOne('Office');
    }

    public static $rules = array(
        'name' => 'required',
        'title' => 'required',
        'email' => 'email|unique:managers',
    );
}