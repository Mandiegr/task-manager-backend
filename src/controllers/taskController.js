const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAllByUser(req.user.id);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};


exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = { title, description, userId: req.user.id };
    const taskId = await Task.create(newTask);
    res.status(201).json({ id: taskId });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  try {
    await Task.update(id, updatedTask);
    res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.delete(id);
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await Task.updateStatus(id, status);
    res.status(200).json({ message: 'Status da tarefa atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const { status } = req.query;

  try {
    let tasks;

    if (status) {
      tasks = await Task.findAllByUserAndStatus(req.user.id, status);
      
    } else {
      tasks = await Task.findAllByUser(req.user.id);
    }

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};
