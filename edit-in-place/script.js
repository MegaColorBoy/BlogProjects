/*
 editPage.js is a tool built to edit content on the fly
*/ 
var oldText, newText, imgHTML;
var isActive = 0;

$(document).on("mouseenter", ".editableField", function(){
  $(this).addClass("editHover");
});

$(document).on("mouseleave", ".editableField", function(){
  $(this).removeClass("editHover");
});

//Display editable form when double clicked on element
$(document).on("dblclick", ".editableField", changeHTML);

//Change the HTML Layout to an editable form
function changeHTML()
{
   if(isActive == 0)
   {
      oldText = $(this).html();

      //Data attributes of the element
      var editType = $(this).data("edittype");
      // alert(editType);

      //If it's an image, store the location of it instead.
      if(editType == "feature-image")
      {
         imgHTML = oldText;
         oldText = $(this).data("imgsrc");
         // alert(oldText);
      }

      //Generate layout based on the edit type
      switch(editType)
      {
         case "feature-title":
          $(this).addClass("noPad").html("")
          .html(`
           <form class="" style="margin-top:0px;">
            <label>Edit title:</label><br/>
            <input type="text" class="editBox" value="`+oldText+`"/><br/>
            <button data-edittype="`+editType+`" type="button" class="saveEdit button button-3d button-green-invert button-mini nomargin">Save</button>
            <button type="button" data-edittype="`+editType+`" class="cancelEdit button button-3d button-red-invert button-mini nomargin">Cancel</button>
           </form>
          `).unbind("dblclick", changeHTML);
          break;

         case "feature-desc":
          $(this).addClass("noPad").html("")
          .html(`
           <form class="" style="margin-top:0px;">
            <label>Edit description:</label>
            <textarea rows="10" style="margin-bottom:5px;margin-top:5px;" class="editBox form-control">`+oldText+`</textarea>
            <button data-edittype="`+editType+`" type="button" class="saveEdit button button-3d button-green-invert button-mini nomargin">Save</button>
            <button type="button" data-edittype="`+editType+`" class="cancelEdit button button-3d button-red-invert button-mini nomargin">Cancel</button>
           </form>
          `).unbind("dblclick", changeHTML);
          break;
      }
      isActive = 1;
   }
}

//Cancel edit changes
$(document).on("click", ".cancelEdit", function(){
     // alert("y");
     var result = confirm("Are you sure you want to cancel changes?");
     if(result)
     {
         $(this).parent().html(oldText).removeClass("noPad")
         .click(changeHTML);
     }
     isActive = 0;
});

//Edit Changes
$(document).on("click", ".saveEdit", function(){
   var result = confirm("Are you sure you want to edit this content?");

   if(result)
   {
      var editType = $(this).data("edittype");

      newText = $(this).parent("form")
           .children(".editBox")
           .val();

      $(this).parent().html(newText)
      .removeClass("noPad")
      .click(changeHTML);

      isActive = 0;
   }
});

var mainElement = document.getElementById("gen-text");

function insert_text(type, text)
{
    var textElement = document.createElement(type);
    textElement.className = "editableField";
    textElement.title = "Double click to edit!";
    textElement.innerHTML = text;

    if(type == "h2" || type == "h3")
    {
        textElement.dataset.edittype = "feature-title";
    }
    else if(type == "p")
    {
        textElement.dataset.edittype = "feature-desc";
    }

    mainElement.appendChild(textElement);
}

function gen_container(index, title, icon)
{
    var row = document.createElement("div");
    row.className = "row";

    var col = document.createElement("div");
    col.className = "col-8";

    var img = document.createElement("img");
    img.className = "icon col-4";
    img.src = icon;

    var heading = document.createElement("h3");
    heading.className = "editableField";
    heading.dataset.edittype = "feature-title";
    heading.title = "Double click to edit!";
    heading.innerHTML = title;

    var desc = document.createElement("p");
    desc.className = "editableField";
    desc.dataset.edittype = "feature-desc";
    desc.title = "Double click to edit!";
    desc.innerHTML = `Nulla facilisi. Nulla ac mauris felis. 
    Nam condimentum aliquet magna. Nam lacinia sollicitudin felis ac convallis.`;

    if(index % 2 == 0)
    {
        row.appendChild(img);
        col.appendChild(heading);
        col.appendChild(desc);
        row.appendChild(col);
    }
    else
    {
        col.appendChild(heading);
        col.appendChild(desc);
        row.appendChild(col);
        row.appendChild(img);
    }

    mainElement.appendChild(row);
}

function gen_text()
{
    insert_text("h2", "Suspendisse sed imperdiet risus. Aenean ipsum velit, lacinia in nisl et, bibendum viverra enim.");
    insert_text("p", `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Pellentesque nec dui vitae massa accumsan semper. In imperdiet quam nec mollis ultrices. 
      Integer elementum justo ac sem molestie, eu lacinia eros mattis. Quisque in varius lectus, 
      id hendrerit ligula.`);
    insert_text("p", `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Pellentesque nec dui vitae massa accumsan semper. In imperdiet quam nec mollis ultrices.`);
    insert_text("p", `Sed cursus, felis eget fringilla varius, ligula nibh blandit urna,
     quis iaculis eros nulla blandit mauris:`);

    var arr = [
      {
        "id" : "1",
        "title" : "Train your wits.",
        "icon" : "icons/chess.svg"
      },
      {
        "id" : "2",
        "title" : "Time to go Rocky.",
        "icon" : "icons/boxing.svg"
      },
      {
        "id" : "3",
        "title" : "Smash the pins.",
        "icon" : "icons/bowling.svg"
      },
      {
        "id" : "4",
        "title" : "Get yourself fitter.",
        "icon" : "icons/dumbbell.svg"
      },
      {
        "id" : "5",
        "title" : "Pack your bags.",
        "icon" : "icons/backpack.svg"
      },
      {
        "id" : "6",
        "title" : "Become a chef.",
        "icon" : "icons/cooking-1.svg"
      }
    ];

    for(i=0; i<arr.length; i++)
    {
        gen_container(i, arr[i].title, arr[i].icon);
    }

    insert_text("p", `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Pellentesque nec dui vitae massa accumsan semper. In imperdiet quam nec mollis ultrices.`);

    insert_text("p", `Pellentesque habitant morbi tristique senectus 
    et netus et malesuada fames ac turpis egestas.`);
}

gen_text();