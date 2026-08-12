import 'package:flutter_test/flutter_test.dart';
import 'package:signfix_technician/main.dart';

void main() {
  testWidgets('technician application starts', (tester) async {
    await tester.pumpWidget(const App());
    expect(find.byType(App), findsOneWidget);
  });
}
