import React, { useState } from 'react';


function GoalForm(){

  const handleSubmit = ()=>{

  };

  return (<form onSubmit={handleSubmit}>
    <label>Add your goal</label>
    <input placeholder="Goal Title"/>
    <input placeholder="Amount"/>
 </form>)
}

export default GoalForm;