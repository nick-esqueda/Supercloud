## COLORS:
* BLACK: #111213
* LIGHT BLACK: #212121
* GRAY: #535353
* LIGHT GRAY: #b3b3b3
* WHITE: #FFFFFF
* YELLOW: #FFFF5D


# FEATURE TO-DO LIST
## 1. SONGS
### SONGS
#### READ
- [ ] seed songs into db
- [ ] create song card component with data/button placeholders (raw no style)
- [ ] create a song page (raw no style)
* - [ ] create song page header component with data placeholders (raw no style)
* - [ ] create comment section component with mock comment cards (raw no style)
* - [ ] create a sidebar component with mock song cards (small) (raw no style)
* - [ ] connect all components to song page
* - [ ] useParams() to grab the :songId from url
* - [ ] useSelector() to get song data once song has been added to store
- [ ] add a frontend route for song page using :songId for useParams()
- [ ] test route
- [ ] create a 'songs' slice of state (action variable, action, thunk, reducer inside a new store/songs.js)
- [ ] add that slice to combineReducers()
- [ ] create an action variable and an addSong action creator that accepts a song
- [ ] add the action to reducer switch
- [ ] create a fetchSong thunk creator that accepts a songId (dispatch loadSong inside)
- [ ] import all from store/songs.js into root entry point and add everything to the window
- [ ] create backend GET /api/songs/:songId route
* - [ ] findByPk() for the song
* - [ ] res.json() that song back to client
- [ ] test thunk by dispatching on window
- [ ] dispatch the thunk in the song page once on page load
- [ ] use fetched song data to display song info
- [ ] add some songs to home page for quick access
- [ ] style the song card component
- [ ] style the song page

### SONGS
#### CREATE
- [ ] create a song upload page (raw no styles)
- [ ] create a song form component (this will also be the song edit form - make dynamic)
- [ ] connect song form to song upload page
- [ ] create validations for song form
- [ ] test form and validations
- [ ] create a postSong thunk creator that accepts a song
* - [ ] fetch request to backend to get secure s3 url (for both song AND artwork?)
* - [ ] post request to s3 bucket (for both song AND artwork?), then grab url(s?)
* - [ ] post request back to DB with all song info to create new entry
* - [ ] dispatch addSong, passing in the return of the backend fetch
- [ ] create backend GET /api/s3URL route
* - [ ] generate a secure s3 url using helper function (implement this func in another module and import)
* - [ ] res.json() that url back to client
- [ ] create backend POST /api/songs route
* - [ ] create the song and save into the DB
* - [ ] res.json() that newly created song back to client
- [ ] test thunk by dispatching on window
- [ ] create onSubmit for form
* - [ ] dispatch thunk inside onSubmit
* - [ ] redirect to song page with the new :songId
- [ ] test form
- [ ] style upload page and song form

### SONGS
#### UPDATE
- [ ] create an edit song modal
- [ ] connect song form to edit song modal
* - [ ] change form to 'edit' version (remove song upload field, change field/button names, change dispatch thunk)
* - [ ] pass in the song info to autofill the form fields
- [ ] test form validations (again)
- [ ] edit the edit button on song card component to accept the modal
- [ ] create an editSong thunk creator that accepts a song
* IF new artwork is uploaded
* * - [ ] fetch request to backend to get secure s3 url for artwork
* * - [ ] post request to s3 bucket for artwork, then grab url
* - [ ] put request back to DB with all song info to update song
* - [ ] dispatch addSong, passing in the return of the backend put request
- [ ] create backend PUT /api/songs/:songId route
* - [ ] update() the song according to :songId
* - [ ] res.json() back the updated song info
- [ ] test thunk by dispatching on window
- [ ] make sure onSubmit for form dispatches the editSong thunk (not postSong) and redirects back to the song page
- [ ] test form
- [ ] style upload page and song form

### SONGS
#### DELETE
- [ ] create a removeSong action creator that takes in a songId and add to the reducer switch
- [ ] create a deleteSong thunk that accepts a songId
* - [ ] delete fetch request to backend
* - [ ] dispatch removeSong, passing in the songId to remove
- [ ] create backend DELETE /api/songs/:songId route
* - [ ] destroy() the song according to :songId
* - [ ] res.json() back the songId for frontend convenience
- [ ] test thunk by dispatching on window
- [ ] edit the delete button on song card component to trigger a window confirm alert
- [ ] edit the delete button on song page to trigger a window confirm alert
- [ ] if (confirm)
* - [ ] dispatch the deleteSong thunk, passing in the :songId
* - [ ] pop up a message confirming deletion success
* - [ ] if on song page, redirect to user's profile page
- [ ] test deletion

### SONGS
#### FINALIZE
- [ ] create a home page
- [ ] style the homepage
- [ ] style anything on site that is still raw
- [ ] create an addSongs action that accepts an array of songs
- [ ] create a fetchSongs thunk for home page
* - [ ] fetch all songs from backend
* - [ ] dispatch the addSongs action, passing in the return of the fetch
- [ ] create backend GET /api/songs route
* - [ ] query db for all songs (limit 10?)
* - [ ] res.json() that array of songs back to client
- [ ] test thunk by dispatching on window
- [ ] dispatch fetchSongs on the home page once upon page load
