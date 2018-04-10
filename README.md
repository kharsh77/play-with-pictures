# play-with-pictures
===================================

A react app where one can set a background picture and place multiples stickers on it.

==================================================================

How to install:
1. git clone https://github.com/kharsh77/play-with-pictures.git
2. cd play-with-pictures/
3. npm install
4. npm run build
5. npm run start
6. Go to http:/127.0.0.1:8080/

=================================================================

How to use the tool:
> Upload a background image by clicking on 'choose a file' button. Only images with size about <1 Mb are allowed to upload.

> By clicking on 'Upload a Sticker', a modal pops up. We need to enter a valid title and an image (size<500kb) in the modal.
After a valid inputs are filled the submit button gets unblurred. Clicking on the 'submit' button adds a sticker on the left
sidebar. By clicking of "close modal" the modal closes and input field values are refreshed.

> Multiple stickers with a title can be added on right sidebar. 

> We can also delete an uploded sticker by clicking on delete button besides sticker's title which pops up when mouse is 
hovered over the title area of the sticker.

> Now, image from each sticker can be dragged and dropped on the backgroung image. A sticker's image can be dropped at 
multiple locations.

> The dropped stickers can be resized using a resize arrow which shows up when mouse is moved over bottom-right corner of the
image.

> The screen can be refreshed to initial stage by clicking over the "Start Over" button on top-left corner. The uploaded 
stickers remain at their respective place.

==================================================================

### Problem and Features Checklist

General
- [x]  Create a tool where you can upload a photo and add stickers on top.
- [x]  The tool has two columns: The photo area on the left, a sidebar containing the sticker library on the right.
- [x]  The sticker library is 150px wide, the photo area fills the remaining width.

Tips and directions
- [x]  Use React.js to implement this.
- [x]  Don't worry about styling, but make sure the user interface is easy to understand.
- [x]  Use File Reader and data URIs for displaying uploaded images.
- [x]  Please use existing frameworks and libraries that will save you time!
- [x]  Don't copy/paste code without attribution.

Photo area
- [x]  Initially, the photo area displays a file input field for uploading a new photo.
- [x]  Display the photo after a valid image has been picked in the input field.
- [x]  Show a "Start over" button in the top left corner when a photo is uploaded.
- [x]  When the "Start over" button is clicked, remove the photo and stickers and allow uploading a new photo.

Sticker library sidebar
- [x]  The library displays an "Upload new sticker" button on top.
- [x]  When the "Upload new sticker" button is clicked, display a form in a modal window.
- [x]  The form in the modal window has a file input field, a title text field and a submit button.
- [x]  All fields are required. Disable the submit button while any field is empty.
- [x]  When the form is submitted, close the modal and add the sticker to the library.
- [x]  The stickers are displayed below the "Upload new sticker" button.
- [x]  A sticker in the library displays the image and title.
- [x]  Resize sticker images in the library area to fit within 150 x 150px.
- [x]  Allow dragging stickers from the sidebar and dropping them onto the photo.
- [x]  When a sticker is dropped onto the photo, it stays in position.
- [x]  The same sticker can be added multiple times.

Bonus feature (These are optional. Pick one or more in case you have time and energy left!)
- [ ]  When a user leaves the tool and returns later, display the state of how the user left the tool.
- [ ]  Use local Storage for data persistence.
- [ ]  Display a warning to the user and stop storing the data in local Storage while the total data size exceeds 5MB.
- [x]  Inform the user of input errors in the "Upload new sticker" form by displaying a user-friendly message below the input field.
- [x]  Allow resizing of the dropped stickers.
- [ ]  Allow repositioning stickers after they were dropped.
- [x]  When you hover a sticker in the sidebar or on the photo, display a delete button in the top right corner that deletes the sticker.
