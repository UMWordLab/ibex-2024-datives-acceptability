PennController.ResetPrefix()
var showProgressBar = false;

// var shuffleSequence = seq(  "consent", "instructions",
//                             "setcounter",
//                             // Fix to include fillers
//                             sepWith("sep", "experimental_trial"),
//                             "sendresults",
//                             "completion"
//                          )
var shuffleSequence = seq( "consent", "IDentry", "demo", "instructions",
                            "startpractice",
                                            
                            followEachWith("sep",seq("practice")),

                            "setcounter",
                            "starter",

                            followEachWith("sep",seq(randomize(rshuffle(
                                "experimental_trial",
                                "filler"
                            )))),

                            "sendresults",
                            "completion"
                            
                      )
                         
var defaults = [
    "Separator", {
        transfer: 1000,                                      // How long between sentences? (ms)
        normalMessage: "Please wait for the next sentence."  // What is message presented between stims? Can be blank.
    }
];

// Consent form
// newTrial("consent",
//     newHtml("consent_form", "consent.html")
//         .cssContainer({"width":"720px"})
//         .checkboxWarning("You must consent before continuing.")
//         .print()
//     ,
//     newButton("continue", "Click to continue")
//         .center()
//         .print()
//         .wait(getHtml("consent_form").test.complete()
//                   .failure(getHtml("consent_form").warn())
//         )
// );


// Template("practice.csv", row => {
//     newTrial("practice",
//             newText("How acceptable is the following sentence? Use the slider to indicate a score with 0 as low and 100 as high.", "<p>"+row.sentence+"</p>")
//                 .print("center at 50vw", "middle at 8vh")
//                 ,
//             // Acceptability slider
//             newScale("practicetest", 100)
//                 .center()
//                 .size("500px","1em")
//                 .slider()
//                 .default(50)
//             ,
//             // Labels
//             newCanvas("container", "500px", "2.25em")
//                 .add( "left at 0%" , 0 , newText("<i>Completely Unacceptable</i>") )
//                 // .add( "center at 50%" , 0 , newText("50%") )
//                 .add( "right at 100%" , 0 , newText("<i>Completely Acceptable</i>") )
//                 .add( "center at 50%" , "bottom at 100%" , getScale("test") )
//                 .center()
//                 .print()
//             ,
//             getScale("practicetest")
//                 .wait()
//                 .log(),
//             newText(row.feedback)
//                 .print("center at 50vw,", "middle at 30vh"),
//             newButton("continue","continue")
//                 .print("center at 50vw", "middle at 50vh")
//                 .wait()
//     )
// })

Template("cleaned_200_pairs.csv", row => 
    newTrial("experimental_trial",
        // Instructions and sentence?
        newText("<i>How acceptable is the following sentence?</i>\n")
            .center()
            .print(),
        newText("<p>" + row.sentence + "</p><br/>")
            .center()
            .print(),
        
        // Acceptability slider
        newScale("test", 100)
            .center()
            .size("500px","1em")
            .slider()
            .default(50)
        ,
        // Labels
        newCanvas("container", "500px", "2.25em")
            .add( "left at 0%" , 0 , newText("<i>Completely Unacceptable</i>") )
            // .add( "center at 50%" , 0 , newText("50%") )
            .add( "right at 100%" , 0 , newText("<i>Completely Acceptable</i>") )
            .add( "center at 50%" , "bottom at 100%" , getScale("test") )
            .center()
            .print()
        ,
        getScale("test").wait().log()
    )
    .log("sentence", row.sentence)
    .log("construct", row.sent_construct)
    .log("alternating")
    .log("IO", row.recipient_id)
    .log("counter", __counter_value_from_server__)
    .log("group", row.group)
    .log("item", row.item)
)

Template("fillers.csv", row =>
    newTrial("filler",
        // Instructions and sentence?
        newText("<i>How acceptable is the following sentence?</i>\n")
            .center()
            .print(),
        newText("<p>" + row.sentence + "</p><br/>")
            .center()
            .print(),
        
        // Acceptability slider
        newScale("test", 100)
            .center()
            .size("500px","1em")
            .slider()
            .default(50)
        ,
        // Labels
        newCanvas("container", "500px", "2.25em")
            .add( "left at 0%" , 0 , newText("<i>Completely Unacceptable</i>") )
            // .add( "center at 50%" , 0 , newText("50%") )
            .add( "right at 100%" , 0 , newText("<i>Completely Acceptable</i>") )
            .add( "center at 50%" , "bottom at 100%" , getScale("test") )
            .center()
            .print()
        ,
        getScale("test").wait().log()
    )
    .log("sentence", row.sentence)
    .log("construct", row.sent_construct)
    .log("alternating")
    .log("counter", __counter_value_from_server__)
    .log("item", row.item)
)

                         
// Template("Experiment.csv", row => {
//     items.push(
//         [[row.label, row.item] , "PennController", 
//             newTrial(
//                 // Instructions and sentence?
//                 newText("trial_sentence", "<p>"+row.sentence+"</p>")
//                     .center()
//                     .print(),
                
//                 // Acceptability slider
//                 newScale("test", 100)
//                     .center()
//                     .size("500px","1em")
//                     .slider()
//                     .default(50)
//                 ,
//                 // Labels
//                 newCanvas("container", "500px", "2.25em")
//                     .add( "left at 0%" , 0 , newText("<i>Completely Unacceptable</i>") )
//                     // .add( "center at 50%" , 0 , newText("50%") )
//                     .add( "right at 100%" , 0 , newText("<i>Completely Acceptable</i>") )
//                     .add( "center at 50%" , "bottom at 100%" , getScale("test") )
//                     .center()
//                     .print()
//                 ,
//                 getScale("test").wait().log()
//             )
//         .log("sentence", row.sentence)
//         .log("counter", __counter_value_from_server__)
//         .log("label", row.label)
//         .log("item", row.item)]
//     );
//   return newTrial('_dummy_',null);
// })

var items = [
    
    ["sep", "Separator", { }],
    
    ["setcounter", "__SetCounter__", { }],
 
    ["sendresults", "__SendResults__", { }],    
    
    ["consent", "Form", { html: { include: "consent.html" } } ],
    ["instructions", "Form", { html: { include: "instructions.html" } } ],
    ["completion", "Form", {continueMessage: null, html: { include: "completion.html" } }],

    
];