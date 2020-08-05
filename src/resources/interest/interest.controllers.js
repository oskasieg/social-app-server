import { Interest } from './interest.model';

export const getInterests = async (req, res) => {
  try {
    const interests = await Interest.find();
    if (!interests) {
      res.status(500).json({ message: 'No interests in database' });
    }

    res.status(200).json(interests);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error while geting interests!' });
  }
};
