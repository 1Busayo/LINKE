pragma solidity ^0.5.0;

contract Linke {

string public name = "Linke";

mapping(uint => Image) public images;

//store Images
uint public imageCount = 0 ;
struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
}


event ImageCreated (
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
);

event ImagTipped(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
    );


//Creatte Images
function uploadImage(string memory _imgHash, string memory _description ) public {
//Make sure the image hash exists
require(bytes(_imgHash).length > 0);

//Make sure imagge description exists
require(bytes(_description).length > 0 );

//Make sure uploader address exisits
require(msg.sender != address(0x0));


//Increment image id
 imageCount ++;

    //Add image to contract
    images[imageCount] = Image(imageCount, _imgHash, _description,0 ,msg.sender);

    //Trigger an Event
    emit ImageCreated(imageCount, _imgHash, _description,0 ,msg.sender);
}

//Tip Images

function tipImageOwner(uint _id) public payable{
  //Make surre the id is valid
  require(_id > 0 && _id <= imageCount);

    //Fetch the image
     Image memory _image =  images[_id];

    //Fetch the author
     address payable _author = _image.author;
     address(_author).transfer(msg.value);

     //Increment the tip amount
      _image.tipAmount = _image.tipAmount + msg.value;
      images[_id] = _image;  

      //trigger an event
      emit ImagTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);
}

}