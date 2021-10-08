const list = require('./../models/todoModel');
const catchAsync = require('./../utils/catchAsync');


exports.addwork = catchAsync(async (req, res) => {
    try {
        console.log("Request", req.body);
        console.log("User", req.user);

        const item = {
            task: req.body.task,
            userId: req.user._id,
            status: req.body.status
        }

        const data = await list.create(item);
        console.log("DATA", data);
        res.status(200).json({
            status: 'success',
             message: 'Work added successfully',
            data: data
           
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
});


exports.deletework = catchAsync(async (req, res) => {
    try {
        console.log("ID", req.body);
        await list.findByIdAndDelete({ _id: req.body.id });
       
        res.status(200).json({
            status: 'success',
            message: 'Task deleted successfully'
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
});

exports.showTask = async(req, res) => {
    try {

        const task = await list.find({ userId: req.params.id });

        res.status(200).json({
            status: 'success',
            message: 'List of all tasks of a user',
            data: task
      })  
    } catch (err) {
       res.status(400).json({
         status: 'fail',
         message: err,
       });
    }
}

