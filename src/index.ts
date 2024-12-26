import {GameController} from "./GameController"
import {IController} from "./IController"
import {IView} from "./IView";
import {View} from "./View";
import {IModel} from "./IModel";
import {Model} from "./Model";
import {IOService} from "./IOService"
import {IIOService} from "./IIOService"

const gameModel: IModel = new Model()
const gameView: IView = new View()
const ioService: IIOService = new IOService()
const gameController: IController = new GameController(gameModel, gameView, ioService)

gameController.run()

/*
        Student model = retriveStudentFromDatabase();
        StudentView view = new StudentView();
        StudentController controller = new StudentController(model, view);
        controller.updateView();
        controller.setStudentName("Vikram Sharma");
        controller.updateView();

        TODO: вот это интересно сделано, только updateView запускать из run
 */

/*
Связь между компонентами
Представленный ниже поток коммуникаций гарантирует, что каждый компонент отвечает за определенный аспект функциональности приложения, что приводит к более удобной в обслуживании и масштабируемой архитектуре.

Взаимодействие пользователя с представлением: пользователь взаимодействует с представлением, например, нажимает кнопку или вводит текст в форму.
Представление получает пользовательский ввод: Представление получает пользовательский ввод и пересылает его Контроллеру.
Контроллер обрабатывает пользовательский ввод: Контроллер получает пользовательский ввод от View. Он интерпретирует ввод, выполняет все необходимые операции (например, обновление модели) и решает, как реагировать.
Контроллер обновляет модель: Контроллер обновляет модель на основе пользовательского ввода или логики приложения.
Модель уведомляет представление об изменениях: если модель изменяется, она уведомляет представление.
Представление запрашивает данные из модели: представление запрашивает данные из модели для обновления своего отображения.
Контроллер обновляет представление: Контроллер обновляет представление на основе изменений в модели или в ответ на ввод данных пользователем.
Представление отображает обновленный пользовательский интерфейс: Представление отображает обновленный пользовательский интерфейс на основе изменений, внесенных Контроллером.
 */

//
//
// Контроллер перехватывает событие извне и в соответствии с заложенной в него логикой,
//     реагирует на это событие изменяя Mодель, посредством вызова соответствующего метода.
//     После изменения Модель использует событие о том что она изменилась, и все подписанные на это события
// Представления, получив его, обращаются к Модели за обновленными данными, после чего их и отображают


// Counter counter = new Counter(count); // model
// Controller controller = new Controller(counter);
// IConsoleView view = new ConsoleView(controller, counter);
// controller.Run(view);

// Controller myController = new Controller(new View(), new Model());
// myController.View.show();
// myController.Model.Value = "2";
// myController.View.show();
// Console.ReadLine();

// IController ctr = new Controller();
// int input =int.Parse(args[0]);
// IView view=new View()
// {
//     GetID = input
// };
//
// ctr.RequestView(view);
// view =ctr.ResponseView();
// view.DisplayId();


// https://stackoverflow.com/questions/1108247/mvc-like-design-for-console-applications
//     https://ru.stackoverflow.com/questions/816048/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-mvc-%D0%BD%D0%B0-es6