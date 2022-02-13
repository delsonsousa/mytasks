import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import { EditTaskArgs } from '../pages/Home';

interface TaskListProps {
  task: Task;
  toogleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle}: EditTaskArgs) => void;
}


export function TasksItem({ task, toogleTaskDone, removeTask, editTask}: TaskListProps) {
  const [ isEditin, setIsEditin ] = useState(false);
  const [ taskNewTitleValue, setTaskNewTitleValue ] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditin() {
    setIsEditin(true);
  }

  function handleCancelEditin() {
    setTaskNewTitleValue(task.title);
    setIsEditin(false);
  }

  function handleSubmitEditin() {
    editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue });
    setIsEditin(false);
  }

  useEffect(() => {
    if(textInputRef.current) {
      if(isEditin) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditin])

  return (
    <View style={styles.constainer}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toogleTaskDone(task.id)}
        >
          <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable={isEditin}
            onSubmitEditing={handleSubmitEditin}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        { isEditin ? (
          <TouchableOpacity
            onPress={handleCancelEditin}
          >
            <Icon 
              name="x"
              size={24}
              color="#b2b2b2"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditin}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.iconsDevider}></View>
        <View>
          <TouchableOpacity
            onPress={() => removeTask(task.id)}
            disabled={isEditin}
          >
           <Image source={trashIcon} style={{ opacity: isEditin ? 0.2 : 1 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDevider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(194, 194, 194, .24)',
    marginHorizontal: 12,
  }
})