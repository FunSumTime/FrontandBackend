import sqlite3

def dict_factory(cursor, row):
    fields = []
    # Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    # Create a dictionary where keys are column names and values are row values
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict


class DB:
    def __init__(self, dbfilename):
        self.dbfilename = dbfilename
        self.connection = sqlite3.connect(dbfilename)
        self.cursor = self.connection.cursor()

    def readAllRecords(self):
        self.cursor.execute("SELECT * FROM trails")
        rows = self.cursor.fetchall()
        all_rows = []
        for row in rows:
            # to get the format we need
            d = dict_factory(self.cursor, row)
            all_rows.append(d)
        print("\nthe rows are", all_rows)
        return all_rows
    
    def saveRecord(self,record):
        data = [record["name"], record["description"], record["length"], record["rating"]]
        # get this out because its hard coded
        # self.cursor.execute("INSERT INTO trails (name,description, length,rating) VALUES ('test','des', 2,2)")
        # cant just put the data in there because they could inject sql to breach us
        # we do string substitution which makes it more robust
        self.cursor.execute("INSERT INTO trails (name,description, length,rating) VALUES (?,?,?,?);", data)


        self.connection.commit()

    def deleteRecord(self,id):
        #  the substitution needs to be a list
        self.cursor.execute("DELETE FROM trails WHERE id = ?;", [id])

        self.connection.commit()

    
    def editRecord(self,id,d):
        data = [d["name"], d["description"], d["length"], d["rating"], id]
        # when you send it into the substitution make sure that its in the same order
        
        self.cursor.execute("UPDATE trails SET name=?, description=?, length=?, rating=? WHERE id = ?", data)


        # made a change so need to commit the changes
        self.connection.commit()
    
    def close(self):
        self.connection.close()



if __name__ == "__main__":
    db = DB("trails.db")
    db.readAllRecords()
    db.saveRecord(1)
    db.readAllRecords()
    db.close()



# make a connection to the db
# connection = sqlite3.connect("trails.db")
# # cursor going to paticular place in file
# cursor = connection.cursor()
# # now can execute comands
# cursor.execute("SELECT * FROM trails")
# # now get the stuff from the cursor
# rows = cursor.fetchall()

# print("the rows are", rows)

# cursor.execute("INSERT INTO trails (name,description,length,rating) VALUES ('testing2', 'describing' , 2,4)")
# connection.commit()
# cursor.execute("SELECT * FROM trails")

# rows = cursor.fetchall()

# print("\nthe rows are", rows)

# connection.close()