(function() {
    'use strict';
    function getExistingRecords() {
        var existingRecords = localStorage.getItem('students');
        if(!existingRecords) {
            existingRecords = [];
        } else {
            try {
                existingRecords = JSON.parse(existingRecords);
            } catch(err) {
                console.error('An error occured in parsing existing records', err);
                existingRecords = [];
            }
        }
        return existingRecords;
    }
    // 1. Allow adding new data - Create
    function saveRecord() {
        var name = document.getElementById('name').value,
            specialization = document.getElementById('specialization').value,
            age = document.getElementById('age').value,
            currentRecord = {
                name: name,
                specialization: specialization,
                age: age
            },
            existingRecords = getExistingRecords(),
            currentRecordIndex = document.getElementById('currentRecordIndex').value;
        if(currentRecordIndex) {
            // Edit
            existingRecords[currentRecordIndex] = currentRecord;
        } else {
            // Create
            existingRecords.push(currentRecord);
        }
        localStorage.setItem('students', JSON.stringify(existingRecords));
        document.getElementById('addOrEditRecordForm').reset();
        displayRecords();
    }
    // 2. Display Existing data - Read / Display
    function displayRecords() {
        // 1. Getting the student data
        var existingRecords = getExistingRecords(),
            htmlMarkup = '';
        // 2. Loop over the student data and generate HTML
        for(var i = 0; i < existingRecords.length; i++) {
            var student = existingRecords[i];
            console.log('student', student);
            htmlMarkup += '<tr>\
              <th scope="row">' + i + '</th>\
              <td>' + student.name + '</td>\
              <td>' + student.specialization + '</td>\
              <td>' + student.age + '</td>\
              <td>\
                <button type="button" class="btn btn-primary" onclick="editRecord('+i+')">Edit</button>\
                <button type="button" class="btn btn-danger" onclick="deleteRecord('+i+')">Delete</button>\
              </td>\
            </tr>';
        }
        // 3. Add student data into the HTML dynamically
        document.getElementById('studentDataWrapper').innerHTML = htmlMarkup;
    }
    // 3. Allow editing data - Update
    function editRecord(index) {
        // 1. Getting the data from localStorage and populating the form
        var existingRecords = getExistingRecords(),
            currentRecord = existingRecords[index];
        console.log('editRecord', index, currentRecord);
        document.getElementById('name').value = currentRecord.name;
        document.getElementById('specialization').value = currentRecord.specialization;
        document.getElementById('age').value = currentRecord.age;
        // 2. Save the updated data at the correct place
        document.getElementById('currentRecordIndex').value = index;
    }
    // 4. Allow deleting data - Deletion
    function deleteRecord(index) {
        var existingRecords = getExistingRecords();
        existingRecords.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(existingRecords));
        displayRecords();
    }
    displayRecords();
    window.saveRecord = saveRecord;
    window.editRecord = editRecord;
    window.deleteRecord = deleteRecord;
})();