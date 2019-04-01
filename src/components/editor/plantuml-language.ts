// https://raw.githubusercontent.com/mknj/monaco-plantuml-example/master/src/plantuml-language.js

import * as monacoEditor from "monaco-editor";

const allPlantumlKeywords =
  "\n;type\n;28\nabstract\nactor\nagent\narchimate\nartifact\nboundary\ncard\nclass\ncloud\ncomponent\ncontrol\ndatabase\nentity\nenum\nfile\nfolder\nframe\ninterface\nnode\nobject\npackage\nparticipant\nqueue\nrectangle\nstack\nstate\nstorage\nusecase\n\n;keyword\n;69\n@enddot\n@endsalt\n@enduml\n@startdot\n@startsalt\n@startuml\nactivate\nagain\nalso\nalt\nas\nautonumber\nbottom\nbox\nbreak\ncaption\ncenter\ncreate\ncritical\ndeactivate\ndestroy\ndown\nelse\nelseif\nend\nendif\nendwhile\nfootbox\nfooter\nfork\ngroup\nheader\nhide\nhnote\nif\nis\nkill\nleft\nlegend\nlink\nloop\nnamespace\nnewpage\nnote\nof\non\nopt\norder\nover\npackage\npage\npar\npartition\nref\nrepeat\nreturn\nright\nrnote\nrotate\nshow\nskin\nskinparam\nstart\nstop\ntitle\ntop\ntop to bottom direction\nup\nwhile\n\n;preprocessor\n;12\n!define\n!definelong\n!else\n!enddefinelong\n!endif\n!exit\n!if\n!ifdef\n!ifndef\n!include\n!pragma\n!undef\n\n;skinparameter\n;432\nActivityBackgroundColor\nActivityBarColor\nActivityBorderColor\nActivityBorderThickness\nActivityDiamondBackgroundColor\nActivityDiamondBorderColor\nActivityDiamondFontColor\nActivityDiamondFontName\nActivityDiamondFontSize\nActivityDiamondFontStyle\nActivityEndColor\nActivityFontColor\nActivityFontName\nActivityFontSize\nActivityFontStyle\nActivityStartColor\nActorBackgroundColor\nActorBorderColor\nActorFontColor\nActorFontName\nActorFontSize\nActorFontStyle\nActorStereotypeFontColor\nActorStereotypeFontName\nActorStereotypeFontSize\nActorStereotypeFontStyle\nAgentBackgroundColor\nAgentBorderColor\nAgentFontColor\nAgentFontName\nAgentFontSize\nAgentFontStyle\nAgentStereotypeFontColor\nAgentStereotypeFontName\nAgentStereotypeFontSize\nAgentStereotypeFontStyle\nArrowColor\nArrowFontColor\nArrowFontName\nArrowFontSize\nArrowFontStyle\nArrowLollipopColor\nArrowThickness\nArtifactBackgroundColor\nArtifactBorderColor\nArtifactFontColor\nArtifactFontName\nArtifactFontSize\nArtifactFontStyle\nArtifactStereotypeFontColor\nArtifactStereotypeFontName\nArtifactStereotypeFontSize\nArtifactStereotypeFontStyle\nBackgroundColor\nBoundaryBackgroundColor\nBoundaryBorderColor\nBoundaryFontColor\nBoundaryFontName\nBoundaryFontSize\nBoundaryFontStyle\nBoundaryStereotypeFontColor\nBoundaryStereotypeFontName\nBoundaryStereotypeFontSize\nBoundaryStereotypeFontStyle\nCaptionFontColor\nCaptionFontName\nCaptionFontSize\nCaptionFontStyle\nCircledCharacterFontColor\nCircledCharacterFontName\nCircledCharacterFontSize\nCircledCharacterFontStyle\nCircledCharacterRadius\nClassAttributeFontColor\nClassAttributeFontName\nClassAttributeFontSize\nClassAttributeFontStyle\nClassAttributeIconSize\nClassBackgroundColor\nClassBorderColor\nClassBorderThickness\nClassFontColor\nClassFontName\nClassFontSize\nClassFontStyle\nClassHeaderBackgroundColor\nClassStereotypeFontColor\nClassStereotypeFontName\nClassStereotypeFontSize\nClassStereotypeFontStyle\nCloudBackgroundColor\nCloudBorderColor\nCloudFontColor\nCloudFontName\nCloudFontSize\nCloudFontStyle\nCloudStereotypeFontColor\nCloudStereotypeFontName\nCloudStereotypeFontSize\nCloudStereotypeFontStyle\nCollectionsBackgroundColor\nCollectionsBorderColor\nColorArrowSeparationSpace\nComponentBackgroundColor\nComponentBorderColor\nComponentBorderThickness\nComponentFontColor\nComponentFontName\nComponentFontSize\nComponentFontStyle\nComponentStereotypeFontColor\nComponentStereotypeFontName\nComponentStereotypeFontSize\nComponentStereotypeFontStyle\nComponentStyle\nConditionStyle\nControlBackgroundColor\nControlBorderColor\nControlFontColor\nControlFontName\nControlFontSize\nControlFontStyle\nControlStereotypeFontColor\nControlStereotypeFontName\nControlStereotypeFontSize\nControlStereotypeFontStyle\nDatabaseBackgroundColor\nDatabaseBorderColor\nDatabaseFontColor\nDatabaseFontName\nDatabaseFontSize\nDatabaseFontStyle\nDatabaseStereotypeFontColor\nDatabaseStereotypeFontName\nDatabaseStereotypeFontSize\nDatabaseStereotypeFontStyle\nDefaultFontColor\nDefaultFontName\nDefaultFontSize\nDefaultFontStyle\nDefaultMonospacedFontName\nDefaultTextAlignment\nDiagramBorderColor\nDiagramBorderThickness\nDpi\nEntityBackgroundColor\nEntityBorderColor\nEntityFontColor\nEntityFontName\nEntityFontSize\nEntityFontStyle\nEntityStereotypeFontColor\nEntityStereotypeFontName\nEntityStereotypeFontSize\nEntityStereotypeFontStyle\nFileBackgroundColor\nFileBorderColor\nFileFontColor\nFileFontName\nFileFontSize\nFileFontStyle\nFileStereotypeFontColor\nFileStereotypeFontName\nFileStereotypeFontSize\nFileStereotypeFontStyle\nFolderBackgroundColor\nFolderBorderColor\nFolderFontColor\nFolderFontName\nFolderFontSize\nFolderFontStyle\nFolderStereotypeFontColor\nFolderStereotypeFontName\nFolderStereotypeFontSize\nFolderStereotypeFontStyle\nFooterFontColor\nFooterFontName\nFooterFontSize\nFooterFontStyle\nFrameBackgroundColor\nFrameBorderColor\nFrameFontColor\nFrameFontName\nFrameFontSize\nFrameFontStyle\nFrameStereotypeFontColor\nFrameStereotypeFontName\nFrameStereotypeFontSize\nFrameStereotypeFontStyle\nGuillemet\nHandwritten\nHeaderFontColor\nHeaderFontName\nHeaderFontSize\nHeaderFontStyle\nHyperlinkColor\nHyperlinkUnderline\nIconIEMandatoryColor\nIconPackageBackgroundColor\nIconPackageColor\nIconPrivateBackgroundColor\nIconPrivateColor\nIconProtectedBackgroundColor\nIconProtectedColor\nIconPublicBackgroundColor\nIconPublicColor\nInterfaceBackgroundColor\nInterfaceBorderColor\nInterfaceFontColor\nInterfaceFontName\nInterfaceFontSize\nInterfaceFontStyle\nInterfaceStereotypeFontColor\nInterfaceStereotypeFontName\nInterfaceStereotypeFontSize\nInterfaceStereotypeFontStyle\nLegendBackgroundColor\nLegendBorderColor\nLegendBorderThickness\nLegendFontColor\nLegendFontName\nLegendFontSize\nLegendFontStyle\nLinetype\nMaxAsciiMessageLength\nMaxMessageSize\nMinClassWidth\nMonochrome\nNodeBackgroundColor\nNodeBorderColor\nNodeFontColor\nNodeFontName\nNodeFontSize\nNodeFontStyle\nNodeStereotypeFontColor\nNodeStereotypeFontName\nNodeStereotypeFontSize\nNodeStereotypeFontStyle\nNodesep\nNoteBackgroundColor\nNoteBorderColor\nNoteBorderThickness\nNoteFontColor\nNoteFontName\nNoteFontSize\nNoteFontStyle\nNoteShadowing\nObjectAttributeFontColor\nObjectAttributeFontName\nObjectAttributeFontSize\nObjectAttributeFontStyle\nObjectBackgroundColor\nObjectBorderColor\nObjectBorderThickness\nObjectFontColor\nObjectFontName\nObjectFontSize\nObjectFontStyle\nObjectStereotypeFontColor\nObjectStereotypeFontName\nObjectStereotypeFontSize\nObjectStereotypeFontStyle\nPackageBackgroundColor\nPackageBorderColor\nPackageBorderThickness\nPackageFontColor\nPackageFontName\nPackageFontSize\nPackageFontStyle\nPackageStereotypeFontColor\nPackageStereotypeFontName\nPackageStereotypeFontSize\nPackageStereotypeFontStyle\nPackageStyle\nPadding\nParticipantBackgroundColor\nParticipantBorderColor\nParticipantFontColor\nParticipantFontName\nParticipantFontSize\nParticipantFontStyle\nPartitionBackgroundColor\nPartitionBorderColor\nPartitionBorderThickness\nPartitionFontColor\nPartitionFontName\nPartitionFontSize\nPartitionFontStyle\nQueueBackgroundColor\nQueueBorderColor\nQueueFontColor\nQueueFontName\nQueueFontSize\nQueueFontStyle\nQueueStereotypeFontColor\nQueueStereotypeFontName\nQueueStereotypeFontSize\nQueueStereotypeFontStyle\nRanksep\nRectangleBackgroundColor\nRectangleBorderColor\nRectangleBorderThickness\nRectangleFontColor\nRectangleFontName\nRectangleFontSize\nRectangleFontStyle\nRectangleStereotypeFontColor\nRectangleStereotypeFontName\nRectangleStereotypeFontSize\nRectangleStereotypeFontStyle\nRoundCorner\nSameClassWidth\nSequenceActorBorderThickness\nSequenceArrowThickness\nSequenceBoxBackgroundColor\nSequenceBoxBorderColor\nSequenceBoxFontColor\nSequenceBoxFontName\nSequenceBoxFontSize\nSequenceBoxFontStyle\nSequenceDelayFontColor\nSequenceDelayFontName\nSequenceDelayFontSize\nSequenceDelayFontStyle\nSequenceDividerBackgroundColor\nSequenceDividerBorderColor\nSequenceDividerBorderThickness\nSequenceDividerFontColor\nSequenceDividerFontName\nSequenceDividerFontSize\nSequenceDividerFontStyle\nSequenceGroupBackgroundColor\nSequenceGroupBodyBackgroundColor\nSequenceGroupBorderColor\nSequenceGroupBorderThickness\nSequenceGroupFontColor\nSequenceGroupFontName\nSequenceGroupFontSize\nSequenceGroupFontStyle\nSequenceGroupHeaderFontColor\nSequenceGroupHeaderFontName\nSequenceGroupHeaderFontSize\nSequenceGroupHeaderFontStyle\nSequenceLifeLineBackgroundColor\nSequenceLifeLineBorderColor\nSequenceLifeLineBorderThickness\nSequenceNewpageSeparatorColor\nSequenceParticipant\nSequenceParticipantBorderThickness\nSequenceReferenceBackgroundColor\nSequenceReferenceBorderColor\nSequenceReferenceBorderThickness\nSequenceReferenceFontColor\nSequenceReferenceFontName\nSequenceReferenceFontSize\nSequenceReferenceFontStyle\nSequenceReferenceHeaderBackgroundColor\nSequenceStereotypeFontColor\nSequenceStereotypeFontName\nSequenceStereotypeFontSize\nSequenceStereotypeFontStyle\nSequenceTitleFontColor\nSequenceTitleFontName\nSequenceTitleFontSize\nSequenceTitleFontStyle\nShadowing\nStackBackgroundColor\nStackBorderColor\nStackFontColor\nStackFontName\nStackFontSize\nStackFontStyle\nStackStereotypeFontColor\nStackStereotypeFontName\nStackStereotypeFontSize\nStackStereotypeFontStyle\nStateAttributeFontColor\nStateAttributeFontName\nStateAttributeFontSize\nStateAttributeFontStyle\nStateBackgroundColor\nStateBorderColor\nStateEndColor\nStateFontColor\nStateFontName\nStateFontSize\nStateFontStyle\nStateStartColor\nStereotypeABackgroundColor\nStereotypeCBackgroundColor\nStereotypeEBackgroundColor\nStereotypeIBackgroundColor\nStereotypeNBackgroundColor\nStereotypePosition\nStorageBackgroundColor\nStorageBorderColor\nStorageFontColor\nStorageFontName\nStorageFontSize\nStorageFontStyle\nStorageStereotypeFontColor\nStorageStereotypeFontName\nStorageStereotypeFontSize\nStorageStereotypeFontStyle\nStyle\nSvglinkTarget\nSwimlaneBorderColor\nSwimlaneBorderThickness\nSwimlaneTitleFontColor\nSwimlaneTitleFontName\nSwimlaneTitleFontSize\nSwimlaneTitleFontStyle\nTabSize\nTitleBackgroundColor\nTitleBorderColor\nTitleBorderRoundCorner\nTitleBorderThickness\nTitleFontColor\nTitleFontName\nTitleFontSize\nTitleFontStyle\nUsecaseBackgroundColor\nUsecaseBorderColor\nUsecaseBorderThickness\nUsecaseFontColor\nUsecaseFontName\nUsecaseFontSize\nUsecaseFontStyle\nUsecaseStereotypeFontColor\nUsecaseStereotypeFontName\nUsecaseStereotypeFontSize\nUsecaseStereotypeFontStyle\n\n;color\n;154\nAPPLICATION\nAliceBlue\nAntiqueWhite\nAqua\nAquamarine\nAzure\nBUSINESS\nBeige\nBisque\nBlack\nBlanchedAlmond\nBlue\nBlueViolet\nBrown\nBurlyWood\nCadetBlue\nChartreuse\nChocolate\nCoral\nCornflowerBlue\nCornsilk\nCrimson\nCyan\nDarkBlue\nDarkCyan\nDarkGoldenRod\nDarkGray\nDarkGreen\nDarkGrey\nDarkKhaki\nDarkMagenta\nDarkOliveGreen\nDarkOrchid\nDarkRed\nDarkSalmon\nDarkSeaGreen\nDarkSlateBlue\nDarkSlateGray\nDarkSlateGrey\nDarkTurquoise\nDarkViolet\nDarkorange\nDeepPink\nDeepSkyBlue\nDimGray\nDimGrey\nDodgerBlue\nFireBrick\nFloralWhite\nForestGreen\nFuchsia\nGainsboro\nGhostWhite\nGold\nGoldenRod\nGray\nGreen\nGreenYellow\nGrey\nHoneyDew\nHotPink\nIMPLEMENTATION\nIndianRed\nIndigo\nIvory\nKhaki\nLavender\nLavenderBlush\nLawnGreen\nLemonChiffon\nLightBlue\nLightCoral\nLightCyan\nLightGoldenRodYellow\nLightGray\nLightGreen\nLightGrey\nLightPink\nLightSalmon\nLightSeaGreen\nLightSkyBlue\nLightSlateGray\nLightSlateGrey\nLightSteelBlue\nLightYellow\nLime\nLimeGreen\nLinen\nMOTIVATION\nMagenta\nMaroon\nMediumAquaMarine\nMediumBlue\nMediumOrchid\nMediumPurple\nMediumSeaGreen\nMediumSlateBlue\nMediumSpringGreen\nMediumTurquoise\nMediumVioletRed\nMidnightBlue\nMintCream\nMistyRose\nMoccasin\nNavajoWhite\nNavy\nOldLace\nOlive\nOliveDrab\nOrange\nOrangeRed\nOrchid\nPHYSICAL\nPaleGoldenRod\nPaleGreen\nPaleTurquoise\nPaleVioletRed\nPapayaWhip\nPeachPuff\nPeru\nPink\nPlum\nPowderBlue\nPurple\nRed\nRosyBrown\nRoyalBlue\nSTRATEGY\nSaddleBrown\nSalmon\nSandyBrown\nSeaGreen\nSeaShell\nSienna\nSilver\nSkyBlue\nSlateBlue\nSlateGray\nSlateGrey\nSnow\nSpringGreen\nSteelBlue\nTECHNOLOGY\nTan\nTeal\nThistle\nTomato\nTurquoise\nViolet\nWheat\nWhite\nWhiteSmoke\nYellow\nYellowGreen\n\n;EOF\n";

function getAllPlantumlKeywords() {
  return allPlantumlKeywords
    .split(/\n/)
    .filter(s => s.length > 1 && !s.startsWith(";"));
}

const editorConfiguration: monacoEditor.languages.LanguageConfiguration = {
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,

  comments: {
    lineComment: "'",
    blockComment: ["/'", "'/"]
  },

  brackets: [["{", "}"], ["[", "]"], ["(", ")"]],

  autoClosingPairs: [
    { open: '"', close: '"', notIn: ["string", "comment"] },
    { open: "{", close: "}", notIn: ["string", "comment"] },
    { open: "[", close: "]", notIn: ["string", "comment"] },
    { open: "(", close: ")", notIn: ["string", "comment"] }
  ]
};

interface MonarchLanguage extends monacoEditor.languages.IMonarchLanguage {
  keywords: string[];
  operators: string[];
  symbols: RegExp;
}

const languageDefinition: MonarchLanguage = {
  tokenPostfix: ".plantuml",
  defaultToken: "invalid",

  keywords: getAllPlantumlKeywords(),

  operators: ["as"],

  symbols: /[xo]?([\[\]\\\}\{\#=><!~?&|+\-*\^]|\/[^']|(\.){2,})+[xo]?/,

  tokenizer: {
    root: [
      // descriptions after `:`
      [/:(.*)$/, "identifier"],

      // operators
      [
        /@symbols/,
        {
          cases: {
            // meant to highlight stuff like `typeof`, `as`, etc.
            "@operators": "keyword.operator",
            "@default": "operator"
          }
        }
      ],

      // identifiers and keywords
      [
        /@[a-zA-Z]+/,
        {
          cases: {
            "@keywords": "keyword"
          }
        }
      ],
      [
        /[a-zA-Z_][a-zA-Z_0-9]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier"
          }
        }
      ],

      // whitespace
      { include: "@whitespace" },

      [/[{}()\[\]]/, "@brackets"],
      [/[;:,]/, "delimiter"],

      // numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/\d+/, "number"],

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }]
    ],

    comment: [
      [/[^\/']+/, "comment"],
      [/'\//, "comment", "@pop"],
      [/[\/']/, "comment"]
    ],

    string: [
      [/[^\\"&]+/, "string"],
      [/\\"/, "string.escape"],
      [/&\w+;/, "string.escape"],
      [/[\\&]/, "string"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }]
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/'/, "comment", "@comment"],
      [/'.*$/, "comment"],
      [/#.$/, "comment"]
    ]
  }
};

export const registerPlantUML = (monaco: typeof monacoEditor) => {
  monaco.languages.register({
    id: "plantuml",
    extensions: [".plantuml", ".puml", ".pu"],
    aliases: ["plantuml"],
    mimetypes: ["text/plantuml"]
  });
  monaco.languages.onLanguage("plantuml", function() {
    monaco.languages.setLanguageConfiguration("plantuml", editorConfiguration);
    monaco.languages.setMonarchTokensProvider("plantuml", languageDefinition);
  });
};
