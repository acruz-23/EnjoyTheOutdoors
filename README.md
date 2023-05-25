# EnjoyTheOutdoors

Capstone 2. Dynamically display information depending on a user's form selection.

## Home Page

Looping, muted, video used as a banner, with a section below displaying randomly fetched wildlife images.

### Home Page's Random Image Generator

Objects containing a different Loremflickr URLs are stored in an array.

```
let imageFiles = [
    {
    url: "https://loremflickr.com/320/240/sea,fish",
    description: "A slippery fish. ",
}, ...
```

A random number is genereated between 0 and the array.length. This is used to reference a URL to return a specific category of animals. ?random=x, where x is a number, is added to the end of the URL to ensure a unique picture is chosen even if the same animal category is chosen twice.

```
function populateCard(cardEl, imgArray) {
    const imgEL = cardEl.querySelector("img");
    const randInt = Math.floor(Math.random() \* imgArray.length);
    imgEL.src = imageFiles[randInt].url + "?random=" + counter;
    imgEL.alt = imageFiles[randInt].description;
    counter++;
    console.log(randInt);
}
```

## Parks Search Page

A still image used as a banner up top. Below are two dropdowns to filter the search and a view all parks checkbox.

### Parks Page Search
