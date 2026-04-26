// NOTE: Gemini API integration is mocked due to API restrictions.
// Replace this section with actual API call using API key.

const getRecommendations = async (req, res) => {
  try {
    const { topic, level } = req.body;

    // 🔥 Mock Gemini response
    const recommendations = [
      {
        title: `${topic} Basics`,
        level: level || "Beginner",
      },
      {
        title: `Advanced ${topic}`,
        level: "Advanced",
      },
      {
        title: `${topic} Projects`,
        level: "Intermediate",
      },
    ];

    res.json({
      success: true,
      source: "mock-gemini",
      data: recommendations,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRecommendations };