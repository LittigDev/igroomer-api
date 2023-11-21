const User = require('../models/userModel');
// const BaseController = require('./baseController');

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if (!password || !email) {
    //   throw BaseController.errorReponse(400, 'Preencha os campos corretamente');
    // }

    const user = await User.findOne({ email: email })
    
    // if (!user || (user && (user.password !== password ))) {
    //   throw BaseController.errorReponse(401, 'Usuário ou senha incorretos');
    // }

    delete user.password

    res.json(user);
  } catch (error) {
    console.error('Erro ao obter usuários do MongoDB:', error);
    res.status(500).json({ error: 'Erro ao obter usuários do MongoDB' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = req.body;

    // if (user.email) {
    //   let count = await User.find({ email: user.email }).count();
    //   if (count >= 1) {
    //     throw BaseController.errorReponse(422, 'E-mail já cadastrado');
    //   }
    // }

    // if (user.contact) {
    //   let count = await User.find({ contact: user.contact }).count();
    //   if (count >= 1) {
    //     throw BaseController.errorReponse(422, 'Número de telefone já cadastrado');
    //   }
    // }
    // if (user.cpf) {
    //   let count = await User.find({ cpf: user.cpf }).count();
    //   if (count >= 1) {
    //     throw BaseController.errorResponse(422, 'CPF/CNPJ já cadastrado');
    //   }
    // }

    const encriptPass = btoa(user.password);
    const userSave = { ...user, password: encriptPass };

    const addUser = new User(userSave);
    await addUser.save();
    res.json({ message: 'Usuário adicionado com sucesso!', addUser });
  } catch (err) {
    console.error('Erro ao adicionar usuário ao MongoDB:', error);
    res.status(500).json({ error: 'Erro ao adicionar usuário ao MongoDB' });    
  }
};