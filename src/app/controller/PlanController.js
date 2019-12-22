import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const list = await Plan.findAll();
    return res.json(list);
  }

  // eslint-disable-next-line class-methods-use-this
  async store(req, res) {
    const { title, duration, price } = req.body;

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

    const register = await Plan.create({
      title,
      duration,
      price,
    });

    return res.json(register);
  }

  // eslint-disable-next-line class-methods-use-this
  async update(req, res) {
    const idPlan = req.params.id;
    const { title, duration, price } = req.body;

    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

    await Plan.update({ title, duration, price }, { where: { id: idPlan } });

    const update = await Plan.findOne({ where: { id: idPlan } });

    return res.json(update);
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(req, res) {
    const idPlanDestroy = req.params.id;
    await Plan.destroy({ where: { id: idPlanDestroy } });
    return res.json({ error: 'Deletado com sucesso' });
  }
}

export default new PlanController();
