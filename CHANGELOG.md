# Changelog

## 0.1.2

- Edited _Tab_ component:
    - Changed Tab format from list of strings to a list of objects ({key:string, label:string}) to account for labels with spaces and special characters
    - Tabs are now always the same height and the text is positioned in vertical and horizontal center
    - When the 'type' is set to 'tabs' the content is automatically styled appropriately.
    - Content classes can be adjusted using the 'contentClass' prop.