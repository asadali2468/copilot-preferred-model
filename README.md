# Copilot Preferred Model Chrome Extension

A Chrome extension that allows you to set and maintain your preferred AI model preference in Microsoft Copilot. This extension ensures your chosen model preference is consistently used across all your Copilot interactions at [copilot.microsoft.com](https://copilot.microsoft.com/).

## Features

🎯 **Set Preferred Model**: Choose your favorite AI model for GitHub Copilot  
🔒 **Persistent Preference**: Your choice is remembered across browser sessions  
⚡ **Lightweight**: Minimal impact on browser performance  
🎨 **Simple Interface**: Easy-to-use popup for configuration  
🔄 **Auto-Apply**: Automatically applies your preference when using Copilot  

## Installation

### From Source (Developer Installation)

1. Clone the repository:
   ```bash
   git clone https://github.com/asadali2468/copilot-preferred-model.git
   cd copilot-preferred-model
   ```

2. Load in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `copilot-preferred-model` folder
   - Extension is now installed and ready to use!

### From Chrome Web Store (Coming Soon)

This extension will be available on the Chrome Web Store for easy installation.

## Usage

### Setting Your Preferred Model

1. Click the extension icon in your Chrome toolbar
2. Select your preferred AI model from the dropdown menu
3. Click "Save" to apply your preference
4. Your choice is now saved and will be applied automatically

### Using with Microsoft Copilot

1. Navigate to [copilot.microsoft.com](https://copilot.microsoft.com/) and start using Copilot
2. Your preferred model will be automatically selected
3. No need to change settings every time - your preference is remembered
4. Enjoy consistent AI assistance with your chosen model

### Changing Your Preference

1. Click the extension icon anytime to modify your choice
2. Select a new model from the dropdown
3. Click "Save" to update your preference
4. Changes take effect immediately

## Supported Models

The extension works with Microsoft Copilot's available model options. The specific models available may vary based on your Copilot subscription and Microsoft's current offerings.

## How It Works

This extension works by:

- Intercepting Copilot requests to Microsoft's servers
- Injecting your preferred model preference into the requests
- Ensuring consistency across all Copilot interactions
- Storing preferences locally for privacy and performance

## Privacy & Security

✅ **No data collection**: Your preferences are stored locally only  
✅ **No tracking**: We don't monitor your usage  
✅ **Open source**: Code is transparent and auditable  
✅ **Minimal permissions**: Only accesses Microsoft Copilot functionality  

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

1. Install dependencies (if any are added in the future)
2. Make your changes to the source code
3. Reload the extension in Chrome's extension manager
4. Test your changes with Microsoft Copilot

## Contributing

Contributions are welcome! Please feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Improve documentation

## Troubleshooting

### Extension Not Working?

- Check if it's enabled in `chrome://extensions/`
- Ensure you're on [copilot.microsoft.com](https://copilot.microsoft.com/) when using Copilot
- Try refreshing the page after setting preferences
- Check browser console for any error messages

### Preference Not Saving?

- Check browser storage permissions
- Try clearing and resetting your preference
- Ensure the extension has proper permissions

### Still Having Issues?

- Open an issue on GitHub
- Include your Chrome version and OS
- Describe the problem in detail

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Join the community

## Acknowledgments

- Built for the Microsoft Copilot community
- Inspired by the need for consistent AI model preferences
- Thanks to all contributors and users

Made with ❤️ for developers who want control over their AI coding experience
