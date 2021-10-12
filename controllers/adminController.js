const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
// const list = require('../models/todoModel');

exports.deleteUser = catchAsync(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (err) {
  // console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
});

exports.allUser = async (req, res) => {
  try {
    const data = await User.find();

    res.status(200).json({
      status: 'success',
      message: 'List of all users',
      data

    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const fields = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: fields
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// exports.updateTask = async(req,res) => {
//     try {

//         const task = await list.findByIdAndUpdate({_id:req.params.id})

//         res.status(200).json({
//             status: 'success',
//             message:'Task updated successfully by admin'
//         })
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err
//      })
//     }
// }
