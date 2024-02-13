PennController.ResetPrefix()
var showProgressBar = false;

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

Template("practice.csv", row => 
    newTrial("practice",
            newText("p_instruct", "<i>How acceptable is the following sentence?</i>\n")
                .center()
                .print(),
            newText("<p>" + row.sentence + "</p><br/>")
                .center()
                .print(),
            // Acceptability slider
            newScale("practicetest", 100)
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
                .add( "center at 50%" , "bottom at 100%" , getScale("practicetest") )
                .center()
                .print()
            ,
            getScale("practicetest")
                .wait()
                .log(),
            getText("p_instruct")
                .text("<p>" + row.feedback + "</p>")
                .center()
                .print(),
            newButton("continue","continue")
                .print("center at 50vw", "middle at 50vh")
                .wait()
    )
)

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

var items = [
    
    ["sep", "Separator", { }],
    
    ["setcounter", "__SetCounter__", { }],
 
    ["sendresults", "__SendResults__", { }],    
    
    ["consent", "Form", { html: { include: "consent.html" } } ],
    ["instructions", "Form", { html: { include: "instructions.html" } } ],
    ["completion", "Form", {continueMessage: null, html: { include: "completion.html" } }],
    
    ["startpractice", Message, {consentRequired: false,
        html: ["div",
               ["p", "First you can do four practice sentences."]
              ]}],
    ["starter", Message, {consentRequired: false,
        html: ["div",
               ["p", "Time to start the main portion of the experiment!"]
              ]}],


    
];