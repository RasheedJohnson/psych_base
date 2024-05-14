import new_test

list_with_ids = []


def main():
    with open("id_defs.py", "w") as file:
        count = 0
        for dict in new_test.item:
            list_with_ids.append(dict)
            list_with_ids[count]["id"] = count
            dict["id"] = count
            count += 1
        file.write(list_with_ids)




if __name__ == "__main__":
    main()