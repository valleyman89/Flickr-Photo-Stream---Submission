import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PictureContext, formatImageData } from "../context/pictureContext";
import App from "../App";

// Define mock picture data
const mockPictures = [
  {
    title: "Wild cat",
    link: "https://www.flickr.com/photos/196357339@N03/52322387509/",
    media: {
      m: "https://live.staticflickr.com/65535/52322387509_2373eef253_m.jpg",
    },
    date_taken: "2022-08-30T13:06:38-08:00",
    description:
      ' <p><a href="https://www.flickr.com/people/196357339@N03/">new-craftxp</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/196357339@N03/52322387509/" title="Wild cat"><img src="https://live.staticflickr.com/65535/52322387509_2373eef253_m.jpg" width="160" height="240" alt="Wild cat" /></a></p> <p>Wild cat from the Novosibirsk Zoo</p>',
    published: "2022-08-30T14:17:59Z",
    author: 'nobody@flickr.com ("new-craftxp")',
    author_id: "196357339@N03",
    tags: "tag1",
  },
  {
    title: "DSC_0301",
    link: "https://www.flickr.com/photos/196336907@N06/52322229138/",
    media: {
      m: "https://live.staticflickr.com/65535/52322229138_2ec4589454_m.jpg",
    },
    date_taken: "2022-08-18T13:48:44-08:00",
    description:
      ' <p><a href="https://www.flickr.com/people/196336907@N06/">Dave CRQ</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/196336907@N06/52322229138/" title="DSC_0301"><img src="https://live.staticflickr.com/65535/52322229138_2ec4589454_m.jpg" width="159" height="240" alt="DSC_0301" /></a></p> ',
    published: "2022-08-30T13:55:40Z",
    author: 'nobody@flickr.com ("Dave CRQ")',
    author_id: "196336907@N06",
    tags: "tag2",
  },
  {
    title: "Codex - Bastit gauged WIP",
    link: "https://www.flickr.com/photos/163884332@N02/52322291434/",
    media: {
      m: "https://live.staticflickr.com/65535/52322291434_a988914bdf_m.jpg",
    },
    date_taken: "2022-08-30T15:33:23-08:00",
    description:
      ' <p><a href="https://www.flickr.com/people/163884332@N02/">Daniele Mariani - Codex</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/163884332@N02/52322291434/" title="Codex - Bastit gauged WIP"><img src="https://live.staticflickr.com/65535/52322291434_a988914bdf_m.jpg" width="234" height="240" alt="Codex - Bastit gauged WIP" /></a></p> <p>WIP Bastit gauged for Swallow Gauged S / Pixie S, coming soon @BlackFair</p>',
    published: "2022-08-30T13:36:57Z",
    author: 'nobody@flickr.com ("Daniele Mariani - Codex")',
    author_id: "163884332@N02",
    tags: "tag3",
  },
];

// Set provide context values
const mockDefaultContextValue = {
  loading: false,
  pictures: formatImageData(mockPictures),
  search: "",
  sfwMode: false,
  getTags: (tagArray, maxNumberOfTags) => {
    return maxNumberOfTags > 0 ? tagArray.slice(0, maxNumberOfTags) : tagArray;
  },
  setPictures: () => {},
  setScrollStatus: () => {},
  setSearch: () => {},
  setSfwMode: () => {},
};

//
beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

// Define the app render call with context
const theApp = (
  <PictureContext.Provider value={mockDefaultContextValue}>
    <App />
  </PictureContext.Provider>
);
// Define search placeholder text
const searchPlaceholderText = "Search for a title or tag...";

// App
test("the entire app renders", () => {
  render(theApp);
  expect(screen.getByText("Flickr Photo Stream")).toBeInTheDocument();
});

// Pictures
test("an image loads on screen and in modal", () => {
  render(theApp);

  // Test an image can appear
  expect(
    screen.getByRole("button", { name: `${mockPictures[0].author_id}` })
  ).toBeInTheDocument();

  // Test the modal loads with a picture
  fireEvent.click(
    screen.getByRole("button", { name: `${mockPictures[0].author_id}` })
  );
  waitFor(() =>
    expect(screen.getByText(mockPictures[0].title)).toBeInTheDocument()
  );
});

// Search
test("that the search box can receive text", () => {
  render(theApp);

  // Test the searchbox can receive text
  fireEvent.change(screen.getByPlaceholderText(searchPlaceholderText), {
    target: { value: mockPictures[0].tags },
  });
  expect(screen.getByPlaceholderText(searchPlaceholderText).value).toBe("tag1");
});

test("that the search results are correct", () => {
  render(theApp);
  // Set the searchtext to be tag1
  fireEvent.change(screen.getByPlaceholderText(searchPlaceholderText), {
    target: { value: mockPictures[0].tags },
  });

  // Get the correct search result
  expect(screen.getByText(mockPictures[0].tags)).toBeInTheDocument();

  // Test the other pictures aren't in the UI
  waitFor(() => {
    expect(screen.getByText(mockPictures[1].tags)).not.toBeInTheDocument();
    expect(screen.getByText(mockPictures[2].tags)).not.toBeInTheDocument();
  });
});
