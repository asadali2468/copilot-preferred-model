# Copilot Preferred Model Chrome Extension

A Chrome extension that allows you to set and maintain your preferred AI model preference in GitHub Copilot. This extension ensures your chosen model (like GPT-4, Claude, etc.) is consistently used across all your Copilot interactions.

## Features

- 🎯 **Set Preferred Model**: Choose your favorite AI model for GitHub Copilot
- 🔒 **Persistent Preference**: Your choice is remembered across browser sessions
- ⚡ **Lightweight**: Minimal impact on browser performance
- 🎨 **Simple Interface**: Easy-to-use popup for configuration
- 🔄 **Auto-Apply**: Automatically applies your preference when using Copilot

## Installation

### From Source (Developer Installation)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/copilot-preferred-model.git
   cd copilot-preferred-model
   ```

2. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `copilot-preferred-model` folder

3. **Extension is now installed and ready to use!**

### From Chrome Web Store (Coming Soon)

*This extension will be available on the Chrome Web Store for easy installation.*

## Usage

### Setting Your Preferred Model

1. **Click the extension icon** in your Chrome toolbar
2. **Select your preferred AI model** from the dropdown menu:
   - GPT-4
   - GPT-3.5
   - Claude
   - Other available models
3. **Click "Save"** to apply your preference
4. **Your choice is now saved** and will be applied automatically

### Using with GitHub Copilot

1. **Navigate to GitHub** and start using Copilot
2. **Your preferred model** will be automatically selected
3. **No need to change settings** every time - your preference is remembered
4. **Enjoy consistent AI assistance** with your chosen model

### Changing Your Preference

- **Click the extension icon** anytime to modify your choice
- **Select a new model** from the dropdown
- **Click "Save"** to update your preference
- **Changes take effect immediately**

## Supported Models

The extension supports all AI models available in GitHub Copilot, including:

- **OpenAI Models**: GPT-4, GPT-3.5, GPT-4 Turbo
- **Anthropic Models**: Claude 3.5 Sonnet, Claude 3 Opus
- **Other Models**: As they become available in Copilot

## How It Works

This extension works by:

1. **Intercepting Copilot requests** to GitHub's servers
2. **Injecting your preferred model preference** into the requests
3. **Ensuring consistency** across all Copilot interactions
4. **Storing preferences locally** for privacy and performance

## Privacy & Security

- ✅ **No data collection**: Your preferences are stored locally only
- ✅ **No tracking**: We don't monitor your usage
- ✅ **Open source**: Code is transparent and auditable
- ✅ **Minimal permissions**: Only accesses GitHub Copilot functionality

## Development

### Project Structure

```
copilot-preferred-model/
├── manifest.json      # Extension configuration
├── background.js      # Background service worker
├── content.js         # Content script for page injection
├── popup.html         # Extension popup interface
├── popup.js          # Popup functionality
└── icons/            # Extension icons
```

### Building from Source

1. **Install dependencies** (if any are added in the future)
2. **Make your changes** to the source code
3. **Reload the extension** in Chrome's extension manager
4. **Test your changes** with GitHub Copilot

### Contributing

Contributions are welcome! Please feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Improve documentation

## Troubleshooting

### Extension Not Working?

1. **Check if it's enabled** in `chrome://extensions/`
2. **Ensure you're on GitHub** when using Copilot
3. **Try refreshing the page** after setting preferences
4. **Check browser console** for any error messages

### Preference Not Saving?

1. **Check browser storage permissions**
2. **Try clearing and resetting** your preference
3. **Ensure the extension has proper permissions**

### Still Having Issues?

- Open an issue on GitHub
- Include your Chrome version and OS
- Describe the problem in detail

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/YOUR_USERNAME/copilot-preferred-model/issues)
- **Discussions**: [Join the community](https://github.com/YOUR_USERNAME/copilot-preferred-model/discussions)

## Acknowledgments

- Built for the GitHub Copilot community
- Inspired by the need for consistent AI model preferences
- Thanks to all contributors and users

---

**Made with ❤️ for developers who want control over their AI coding experience**
