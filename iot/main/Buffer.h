#ifndef BUFFER_H
#define BUFFER_H

#include <vector>
using namespace std;

/**
 * @brief De ComBuffer class is een class die een buffer heeft voor de communicatie.
 * @details De class heeft een vector met Strings die de berichten opslaat.
 */
class ComBuffer
{
private:
    vector<String> data;

public:
    ComBuffer() {}
    ~ComBuffer() {}

    /**
     * @brief De functie om een bericht toe te voegen aan de buffer.
     * @param bericht de String die je wilt toevoegen aan de buffer
    */
    void saveData(String bericht)
    {
        data.push_back(bericht);
    }

    /**
     * @brief De functie om alle berichten uit de buffer te krijgen.
     * @return vector<String> een vector met alle berichten in de buffer
    */
    vector<String> &getData()
    {
        return data;
    }

    /**
     * @brief De functie om het aantal berichten in de buffer te krijgen.
     * @return int het aantal berichten in de buffer
    */
    int getLength()
    {
        return this->data.size();
    }

    /**
     * @brief De functie om alle berichten uit de buffer te verwijderen.
    */
    void clearData()
    {
        data.clear();
    }
};

#endif