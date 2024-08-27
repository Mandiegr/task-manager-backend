const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { unDecrypted, encrypt } = require('../utils');

require('dotenv').config();

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (user) return res.status(400).json({ message: 'Usuário já existe' });

    const passCrypto =  encrypt(password, process.env.JWT_SECRET)

    const newUser = { email, password: passCrypto };

    const userId = await User.create(newUser);
    
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });

    const decryptedPas = unDecrypted(user.password, process.env.JWT_SECRET)

    console.log({ password, user_password: user.password, decryptedPas})
    const isMatch =  String(password) === decryptedPas

    console.log({ isMatch})
    if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas, email ou senha' });

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};


exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logout realizado com sucesso' });
};
