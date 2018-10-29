
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskID: {//Unique ID
   type: String,
   required: true 
  },
  taskName: { // Name of the task
    type: String,
    required: true,
  },
  completed: { //Is the task completed or not
    type: Boolean,
    required: true,
  },
  timestamp: { //time when the task was completed
    type: String,
    required: true,
  },
});

//Makes sure that all virtuals are set on the user when we use it.
taskSchema.set('toObject', { virtuals: true });

//Converts mongoose properties from objects to strings,booleans, etc...
taskSchema.method('toGraph', function toGraph(this: any) {
  return JSON.parse(JSON.stringify(this));
});

//Compiles the schema into a model
export default mongoose.model('Task', taskSchema);