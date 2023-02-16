#ifndef BUFFER_H
#define  BUFFER_H

#include <vector>
using namespace std;


class ComBuffer{

    private:
        vector<String> data;

    public:
        ComBuffer();
        ~ComBuffer();

// Voeg een String toe aan de buffer
    void saveData(String bericht){
        data.push_back(bericht);
    }

// returned een reference vector<String> met alle berichten in de buffer
    vector<String>& getData(){
        return data;
    }

// returned de lengte van de buffer
    int getLength(){
        return this->data.size();
    }

// verwijderd alle berichten uit de buffer
    void clearData(){
        data.clear();
    }

};

#endif