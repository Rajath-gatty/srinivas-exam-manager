
module.exports = (studentArr,timetable,courseName) => {

    const contentBody = (regno,first_name,last_name,dept_name,course_name,semester,image_path,index) =>[
        {
        margin:[120,0,0,0],
        table:{
            body:[
                [{text:'SRINIVAS',bold:true,fontSize:18,margin:[0,10,5,0,0]},	        {
                width:[40],
                image:'data:image/png;base64,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'
           },
             {text:'UNIVERSITY',bold:true,fontSize:18,margin:[5,10,0,0,0]}],
           ]
        },
        layout: 'noBorders'
       },
       {
        columns: [
           {
           alignment:'center',
           margin:[0,30,0,30],
           table: {
               widths:['*','*',160],
               body:[
                [{text:'USN',style:{bold:true}},{text:'College Code',style:{bold:true}},{text:'Name of Examination',style:{bold:true}}],
                [{text:`${regno}`,margin:[0,7,0,0]},{text:'CCIS',margin:[0,7,0,0]},`${course_name?course_name:courseName}-Semester ${semester} \n Examination 2022-2023`],
               ]
           }
         }
       ]
      },
      {
          text:[
              {text:'Candidate Name',style:'stdInfo'},
              `  :   ${first_name+' '+last_name} \n \n`,
               {text:'Examination Center',style:'stdInfo'},
               ` :   ${dept_name} \n \n `
          ]
      },
      {
          columns: [
              {
               //   width:[400],
                  alignment:'center',
                  table:{
                      widths:[20,'*',110,'*',90],
                       body:[
                           [{text:'sl#',margin:[0,5]},{text:'Subject Code',margin:[0,5],style:{bold:true}},{text:'Subject Name',margin:[0,5],style:{bold:true}},{text:'Exam Date',margin:[0,5],style:{bold:true}},{text:'Exam Time',margin:[0,5],style:{bold:true}}],
                           ...timetable.map((item,i)=> {
                            return  [{text:i+1,margin:[0,10,0,0]},{text:item.subj_code,margin:[0,10,0,0]},{text:item.subj_name,margin:[0,10,0,5]},{text:item.exam_date,margin:[0,10,0,0]},{text:item.exam_time,margin:[0,3]}]
                        })

                       ],
                  }
              },
              {
                 table: {
                    margin:[50,50,50,50],
                    body:[
                        [{image:`./uploads/${image_path}`,width:100,margin:[10,0,0,0]}],
                        [{text:'Candidates \nSignature',alignment:'center',bold:true,margin:[0,40,0,0]}]
                    ]
                 },
                 layout:'noBorders'
              }
          ]
      },
      {
          text:'The candidate is permitted to appear for the examination',
          bold:true,
          margin:[0,40,0,0],
          pageBreak: studentArr.length<=index+1?null:'after'
      },
    ]



    return  dd = {
        background: function (currentPage, pageSize) {
            return {
            table: {
            widths: [pageSize.width - 60],
            heights: [pageSize.height - 60],
            body: [['']]
            },
            margin: 20
            };
            },
        pageMargins:[40,40],
        footer: {columns:[{text:' Dean',margin:[40,-30,0,0],bold:true},{text:'Registrar(E)',margin:[0,-30,50,0],bold:true,alignment:'right'}]},
        content: studentArr.map((item,index)=>contentBody(item.regno,item.first_name,item.last_name,item.dept_name,item.course_name,item.semester,item.image_path,index)),
        defaultStyle: {
            font:'Times',
        },
        styles:{
            stdInfo: {
                bold:true,
                margin:[0,100,30,20]
            },
        },
        compress:false
    };
}