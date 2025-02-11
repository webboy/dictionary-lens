# Dictionary Lens

Dictionary Lens is a powerful mobile application that combines real-time object detection with instant translation capabilities. Point your camera at objects around you and get immediate translations and usage examples to enhance your language learning experience.

## Features

### 📸 Real-Time Object Detection
- Instant object recognition using your device's camera
- Powered by multiple AI services including TensorFlow, Google Vision, Azure Vision, and Hugging Face
- Real-time visual overlay of detected objects

### 🔍 Smart Dictionary
- Comprehensive dictionary functionality with instant translations
- Example sentences for better context understanding
- Support for plural forms and various word usages
- Local storage for offline access to your translation history

### 🛠️ Advanced Settings
- Customizable camera and detection settings
- Privacy-focused controls for AI processing features
- Complete data management options
- Adjustable interface preferences

## Technical Architecture

The application is built using Vue.js with a modular architecture:

### Core Components
- **CameraView**: Handles real-time camera feed and image processing
- **DetectionOverlay**: Provides visual feedback for detected objects
- **SearchBar**: Enables quick dictionary lookups
- **WordList**: Displays translation history and saved items
- **TranslationDialog**: Shows detailed translation information

### Services
- **DatabaseService**: Manages local data storage
- **DetectionService**: Handles object detection processing
- **TranslationService**: Manages translation requests and responses

### State Management
- **SettingsStore**: Handles application configuration
- **DictionaryStore**: Manages translation data and history

## Privacy Features

Dictionary Lens is designed with privacy as a top priority:

- All image processing is performed locally on your device
- No images are stored or transmitted to external servers
- Only detected object labels are processed for translation
- All translations and examples are stored locally
- No personal information is collected or shared

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dictionary-lens.git
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## Dependencies

- Vue.js 3
- TensorFlow.js
- Various AI services SDKs
- IndexedDB for local storage
- Vue Router for navigation
- Pinia for state management

## Contributing

We welcome contributions to Dictionary Lens! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or concerns about privacy or the application:
- Email: nemanjam@greenlinetrading.co.uk

## Acknowledgments

- TensorFlow team for their excellent object detection models
- OpenAI for providing translation and example generation capabilities
- Google Cloud Vision API team
- Azure Computer Vision team
- Hugging Face team